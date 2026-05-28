class SolicitudRepositoryPort {
  async create(solicitud) {
    throw new Error('Método no implementado');
  }

  async findAbiertas(idVoluntario) {
    throw new Error('Método no implementado');
  }

  async findByUserId(idUsuario) {
    throw new Error('Método no implementado');
  }

  async findHistorialByUserId(idUsuario) {
    throw new Error('Método no implementado');
  }

  async findById(idSolicitud) {
    throw new Error('Método no implementado');
  }

  async updateEstado(idSolicitud, estado, connection = null) {
    throw new Error('Método no implementado');
  }
}

module.exports = SolicitudRepositoryPort;
