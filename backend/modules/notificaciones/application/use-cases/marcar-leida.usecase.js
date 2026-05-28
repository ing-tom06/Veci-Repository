class MarcarLeidaUseCase {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async execute(idNotification, idUsuario) {
    const success = await this.notificacionRepository.markAsRead(idNotification, idUsuario);
    if (!success) {
      const error = new Error('No se pudo marcar la notificación como leída o no pertenece al usuario');
      error.status = 404;
      throw error;
    }
    return { id_notification: idNotification, leido: 1 };
  }
}

module.exports = MarcarLeidaUseCase;
