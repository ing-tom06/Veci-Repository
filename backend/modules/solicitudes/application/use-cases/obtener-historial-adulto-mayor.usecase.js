class ObtenerHistorialAdultoMayorUseCase {
  constructor(solicitudRepository) {
    this.solicitudRepository = solicitudRepository;
  }

  async execute(idUsuario) {
    return await this.solicitudRepository.findHistorialByUserId(idUsuario);
  }
}

module.exports = ObtenerHistorialAdultoMayorUseCase;
