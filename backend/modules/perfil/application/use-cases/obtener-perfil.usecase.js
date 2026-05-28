class ObtenerPerfilUseCase {
  constructor(perfilRepository) {
    this.perfilRepository = perfilRepository;
  }

  async execute(idUsuario) {
    return await this.perfilRepository.getPerfilById(idUsuario);
  }
}

module.exports = ObtenerPerfilUseCase;
