class ObtenerSolicitudesAbiertasUseCase {
  constructor(solicitudRepository) {
    this.solicitudRepository = solicitudRepository;
  }

  async execute(idVoluntario) {
    return await this.solicitudRepository.findAbiertas(idVoluntario);
  }
}

module.exports = ObtenerSolicitudesAbiertasUseCase;
