class ChatRepositoryPort {
  async getConversations(idUsuario, rol) {
    throw new Error('Método no implementado');
  }

  async getMessagesBySolicitud(idSolicitud) {
    throw new Error('Método no implementado');
  }

  async createMessage(idSolicitud, idEmisor, idReceptor, contenido) {
    throw new Error('Método no implementado');
  }

  async getSolicitudInteraction(idSolicitud) {
    throw new Error('Método no implementado');
  }
}

module.exports = ChatRepositoryPort;
