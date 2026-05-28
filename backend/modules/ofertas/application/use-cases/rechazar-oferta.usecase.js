class RechazarOfertaUseCase {
  constructor(ofertaRepository) {
    this.ofertaRepository = ofertaRepository;
  }

  async execute(idOferta) {
    if (isNaN(idOferta)) {
      throw new Error('ID de oferta inválido');
    }
    return await this.ofertaRepository.rejectOferta(idOferta);
  }
}

module.exports = RechazarOfertaUseCase;
