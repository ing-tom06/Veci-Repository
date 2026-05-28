class ObtenerCalificacionesForUserUseCase {
  constructor(calificacionRepository) {
    this.calificacionRepository = calificacionRepository;
  }

  async execute(idUsuario) {
    return await this.calificacionRepository.getCalificacionesForUser(idUsuario);
  }
}

module.exports = ObtenerCalificacionesForUserUseCase;
