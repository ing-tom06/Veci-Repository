const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginUsuarioUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(correo, contrasena) {
    if (!correo || !contrasena) {
      const error = new Error('Faltan campos requeridos.');
      error.status = 400;
      throw error;
    }

    const users = await this.authRepository.findByEmail(correo);
    if (users.length === 0) {
      const error = new Error('Credenciales inválidas.');
      error.status = 400;
      throw error;
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      const error = new Error('Credenciales inválidas.');
      error.status = 400;
      throw error;
    }

    const profile = await this.authRepository.findProfileByUserId(user.id_usuario) || {};

    const payload = {
      user: {
        id: user.id_usuario,
        rol: user.rol,
        nombre: profile.nombre || 'Usuario',
        foto: profile.foto_perfil || null,
        promedio_calificaciones: profile.promedio_calificaciones || 0
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { token, user: payload.user };
  }
}

module.exports = LoginUsuarioUseCase;
