class CalificacionRepositoryPort {
  async createCalificacion(idSolicitud, idCalificador, idCalificado, puntaje, comentario) {
    throw new Error('Método no implementado');
  }

  async getCalificacionBySolicitudAndCalificador(idSolicitud, idCalificador) {
    throw new Error('Método no implementado');
  }

  async getCalificacionesForUser(idUsuario) {
    throw new Error('Método no implementado');
  }

  async getSolicitudInteraction(idSolicitud) {
    throw new Error('Método no implementado');
  }
}

module.exports = CalificacionRepositoryPort;
