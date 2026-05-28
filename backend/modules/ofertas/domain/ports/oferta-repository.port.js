class OfertaRepositoryPort {
  async createOferta(idUsuario, idSolicitud) {
    throw new Error('Método no implementado');
  }

  async getMisOfertasActivas(idUsuario) {
    throw new Error('Método no implementado');
  }

  async getHistorialVoluntario(idUsuario) {
    throw new Error('Método no implementado');
  }

  async getOfertasBySolicitud(idSolicitud) {
    throw new Error('Método no implementado');
  }

  async acceptOferta(idOferta, idSolicitud, idActor) {
    throw new Error('Método no implementado');
  }

  async rejectOferta(idOferta) {
    throw new Error('Método no implementado');
  }

  async getSolicitudOwner(idSolicitud) {
    throw new Error('Método no implementado');
  }

  async getOfertaDetails(idOferta) {
    throw new Error('Método no implementado');
  }
}

module.exports = OfertaRepositoryPort;
