class ObtenerConversacionesUseCase {
  constructor(chatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(idUsuario, rol) {
    return await this.chatRepository.getConversations(idUsuario, rol);
  }
}

module.exports = ObtenerConversacionesUseCase;
