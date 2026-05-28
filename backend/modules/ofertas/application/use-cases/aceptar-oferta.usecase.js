class AceptarOfertaUseCase {
  constructor(ofertaRepository, crearNotificacionUseCase) {
    this.ofertaRepository = ofertaRepository;
    this.crearNotificacionUseCase = crearNotificacionUseCase;
  }

  async execute(idOferta, idSolicitud, idActor) {
    if (!idSolicitud || isNaN(idOferta)) {
      throw new Error('Parámetros inválidos para aceptar la oferta');
    }
    
    // Get voluntario ID from the offer details before or after update
    let voluntarioId = null;
    try {
      const details = await this.ofertaRepository.getOfertaDetails(idOferta);
      if (details) {
        voluntarioId = details.id_voluntario;
      }
    } catch (err) {
      console.error('Error fetching offer details in AceptarOfertaUseCase:', err);
    }

    const result = await this.ofertaRepository.acceptOferta(idOferta, idSolicitud, idActor);

    // Notify the Voluntario asynchronously
    if (voluntarioId) {
      try {
        await this.crearNotificacionUseCase.execute(
          voluntarioId,
          'Oferta Aceptada',
          '¡Felicitaciones! Tu oferta de ayuda ha sido aceptada. El chat ahora está habilitado.'
        );
      } catch (err) {
        console.error('Error sending notification in AceptarOfertaUseCase:', err);
      }
    }

    return result;
  }
}

module.exports = AceptarOfertaUseCase;
