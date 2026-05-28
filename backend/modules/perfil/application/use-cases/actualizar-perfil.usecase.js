const Perfil = require('../../domain/models/perfil');

class ActualizarPerfilUseCase {
  constructor(perfilRepository) {
    this.perfilRepository = perfilRepository;
  }

  async execute(idUsuario, data) {
    const perfil = new Perfil({
      id_usuario: idUsuario,
      nombre: data.nombre,
      apellido: data.apellido,
      edad: data.edad,
      telefono: data.telefono,
      documento_identidad: data.documento_identidad,
      foto_perfil: data.foto_perfil
    });

    perfil.validar();

    await this.perfilRepository.updatePerfil(idUsuario, perfil);
  }
}

module.exports = ActualizarPerfilUseCase;
