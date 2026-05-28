class CrearOfertaUseCase {
  constructor(ofertaRepository, crearNotificacionUseCase) {
    this.ofertaRepository = ofertaRepository;
    this.crearNotificacionUseCase = crearNotificacionUseCase;
  }

  async execute(idUsuario, idSolicitud) {
    if (!idSolicitud) {
      throw new Error('Se requiere id_solicitud');
    }
    const result = await this.ofertaRepository.createOferta(idUsuario, idSolicitud);
    
    // Notify the Adulto Mayor (owner of the solicitud) asynchronously
    try {
      const ownerId = await this.ofertaRepository.getSolicitudOwner(idSolicitud);
      if (ownerId) {
        await this.crearNotificacionUseCase.execute(
          ownerId,
          'Nueva Oferta Recibida',
          'Un voluntario ha postulado una oferta de ayuda para tu solicitud.'
        );
      }
    } catch (err) {
      console.error('Error sending notification in CrearOfertaUseCase:', err);
    }

    return result;
  }
}

module.exports = CrearOfertaUseCase;
