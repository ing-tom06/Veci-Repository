class ObtenerMensajesUseCase {
  constructor(chatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(idSolicitud, idUsuario) {
    const interaction = await this.chatRepository.getSolicitudInteraction(idSolicitud);
    if (!interaction) {
      const error = new Error('El chat no está habilitado para esta solicitud');
      error.status = 403;
      throw error;
    }

    if (Number(interaction.id_adulto_mayor) !== Number(idUsuario) && Number(interaction.id_voluntario) !== Number(idUsuario)) {
      const error = new Error('No tienes permiso para acceder a este chat');
      error.status = 403;
      throw error;
    }

    return await this.chatRepository.getMessagesBySolicitud(idSolicitud);
  }
}

module.exports = ObtenerMensajesUseCase;
