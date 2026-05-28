const Notificacion = require('../../domain/models/notificacion');

class CrearNotificacionUseCase {
  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  async execute(idUsuario, titulo, mensaje) {
    const notificacion = new Notificacion({
      id_usuario: idUsuario,
      titulo,
      mensaje
    });

    notificacion.validar();

    const insertId = await this.notificacionRepository.createNotification(
      notificacion.id_usuario,
      notificacion.titulo,
      notificacion.mensaje
    );

    return {
      id_notification: insertId,
      id_usuario: notificacion.id_usuario,
      titulo: notificacion.titulo,
      mensaje: notificacion.mensaje,
      leido: 0
    };
  }
}

module.exports = CrearNotificacionUseCase;
