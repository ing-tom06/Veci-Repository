class ObtenerHistorialVoluntarioUseCase {
  constructor(ofertaRepository) {
    this.ofertaRepository = ofertaRepository;
  }

  async execute(idUsuario) {
    return await this.ofertaRepository.getHistorialVoluntario(idUsuario);
  }
}

module.exports = ObtenerHistorialVoluntarioUseCase;
