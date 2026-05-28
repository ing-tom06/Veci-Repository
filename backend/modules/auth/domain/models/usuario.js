const { validateRegistration } = require('../validation');

class Usuario {
  constructor({ id_usuario, rol, correo, contrasena }) {
    this.id_usuario = id_usuario;
    this.rol = rol;
    this.correo = correo;
    this.contrasena = contrasena;
  }

  static validarRegistro(data) {
    const validationError = validateRegistration(data);
    if (validationError) {
      const error = new Error(validationError);
      error.status = 400;
      throw error;
    }
  }
}

module.exports = Usuario;
