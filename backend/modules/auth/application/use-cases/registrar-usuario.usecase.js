const bcrypt = require('bcrypt');
const Usuario = require('../../domain/models/usuario');
const { sendConfirmationEmail } = require('../../../../utils/email.util');

class RegistrarUsuarioUseCase {
  constructor(authRepository, dbPool) {
    this.authRepository = authRepository;
    this.db = dbPool;
  }

  async execute(data, fotoPerfilUrl) {
    const { rol, correo, contrasena, nombre, apellido, edad, telefono, documento_identidad } = data;

    // Execute domain validations
    Usuario.validarRegistro(data);

    const connection = await this.db.getConnection();
    try {
      // Check if user exists
      const existingUsers = await this.authRepository.findByEmail(correo);
      if (existingUsers.length > 0) {
        const error = new Error('El correo ya está registrado.');
        error.status = 400;
        throw error;
      }

      // Start database transaction
      await connection.beginTransaction();

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contrasena, salt);

      // Save user
      const idUsuario = await this.authRepository.createUser(rol, correo, hashedPassword, connection);

      // Save profile
      await this.authRepository.createProfile(
        idUsuario,
        nombre,
        apellido,
        edad,
        telefono,
        documento_identidad,
        fotoPerfilUrl,
        connection
      );

      await connection.commit();

      // Send confirmation email asynchronously (no await)
      sendConfirmationEmail(nombre, correo);

      return { message: 'Usuario registrado exitosamente.' };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = RegistrarUsuarioUseCase;
