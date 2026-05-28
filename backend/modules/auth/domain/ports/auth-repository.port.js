class AuthRepositoryPort {
  async findByEmail(correo) {
    throw new Error('Método no implementado');
  }

  async createUser(rol, correo, passwordHash, connection = null) {
    throw new Error('Método no implementado');
  }

  async createProfile(idUsuario, nombre, apellido, edad, telefono, documento_identidad, fotoPerfil, connection = null) {
    throw new Error('Método no implementado');
  }

  async findProfileByUserId(idUsuario) {
    throw new Error('Método no implementado');
  }
}

module.exports = AuthRepositoryPort;
