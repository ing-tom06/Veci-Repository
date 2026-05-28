class NotificacionRepositoryPort {
  async createNotification(idUsuario, titulo, mensaje) {
    throw new Error('Método no implementado');
  }

  async getNotificationsForUser(idUsuario) {
    throw new Error('Método no implementado');
  }

  async markAsRead(idNotification, idUsuario) {
    throw new Error('Método no implementado');
  }
}

module.exports = NotificacionRepositoryPort;
