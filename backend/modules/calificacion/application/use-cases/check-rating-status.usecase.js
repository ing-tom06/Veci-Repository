class CheckRatingStatusUseCase {
  constructor(calificacionRepository) {
    this.calificacionRepository = calificacionRepository;
  }

  async execute(idSolicitud, idUsuario) {
    const interaction = await this.calificacionRepository.getSolicitudInteraction(idSolicitud);
    if (!interaction) {
      return { eligible: false, message: 'Solicitud no encontrada o sin interacción' };
    }

    if (interaction.estado_solicitud !== 'FINALIZADA') {
      return { eligible: false, message: 'La solicitud no está FINALIZADA' };
    }

    if (interaction.id_adulto_mayor !== idUsuario && interaction.id_voluntario !== idUsuario) {
      return { eligible: false, message: 'No participaste en esta solicitud' };
    }

    const existing = await this.calificacionRepository.getCalificacionBySolicitudAndCalificador(idSolicitud, idUsuario);
    if (existing) {
      return { eligible: false, alreadyRated: true, calificacion: existing, message: 'Ya has calificado esta interacción' };
    }

    return { eligible: true, message: 'Puedes calificar esta interacción' };
  }
}

module.exports = CheckRatingStatusUseCase;
