class ObtenerMisOfertasActivasUseCase {
  constructor(ofertaRepository) {
    this.ofertaRepository = ofertaRepository;
  }

  async execute(idUsuario) {
    return await this.ofertaRepository.getMisOfertasActivas(idUsuario);
  }
}

module.exports = ObtenerMisOfertasActivasUseCase;
