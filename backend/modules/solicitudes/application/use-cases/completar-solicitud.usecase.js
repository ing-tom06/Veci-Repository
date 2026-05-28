class CompletarSolicitudUseCase {
  constructor(solicitudRepository) {
    this.solicitudRepository = solicitudRepository;
  }

  async execute(idSolicitud, idActor) {
    return await this.solicitudRepository.completeSolicitud(idSolicitud, idActor);
  }
}

module.exports = CompletarSolicitudUseCase;
