class ObtenerNotificacionesUseCase {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async execute(idUsuario) {
    return await this.notificacionRepository.getNotificationsForUser(idUsuario);
  }
}

module.exports = ObtenerNotificacionesUseCase;
