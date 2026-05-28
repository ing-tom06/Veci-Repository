class ObtenerOfertasBySolicitudUseCase {
  constructor(ofertaRepository) {
    this.ofertaRepository = ofertaRepository;
  }

  async execute(idSolicitud) {
    return await this.ofertaRepository.getOfertasBySolicitud(idSolicitud);
  }
}

module.exports = ObtenerOfertasBySolicitudUseCase;
