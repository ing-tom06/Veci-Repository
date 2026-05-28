class ObtenerMisSolicitudesUseCase {
  constructor(solicitudRepository) {
    this.solicitudRepository = solicitudRepository;
  }

  async execute(idUsuario) {
    return await this.solicitudRepository.findByUserId(idUsuario);
  }
}

module.exports = ObtenerMisSolicitudesUseCase;
