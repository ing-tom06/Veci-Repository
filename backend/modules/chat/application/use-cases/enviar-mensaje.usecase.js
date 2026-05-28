const Mensaje = require('../../domain/models/mensaje');

class EnviarMensajeUseCase {
  constructor(chatRepository, crearNotificacionUseCase) {
    this.chatRepository = chatRepository;
    this.crearNotificacionUseCase = crearNotificacionUseCase;
  }

  async execute(idSolicitud, idEmisor, contenido) {
    const mensaje = new Mensaje({
      id_solicitud: idSolicitud,
      id_emisor: idEmisor,
      contenido
    });

    mensaje.validar();

    const interaction = await this.chatRepository.getSolicitudInteraction(idSolicitud);
    if (!interaction) {
      const error = new Error('El chat no está habilitado para esta solicitud');
      error.status = 403;
      throw error;
    }

    let idReceptor;
    if (Number(interaction.id_voluntario) === Number(idEmisor)) {
      idReceptor = interaction.id_adulto_mayor;
    } else if (Number(interaction.id_adulto_mayor) === Number(idEmisor)) {
      idReceptor = interaction.id_voluntario;
    } else {
      const error = new Error('No estás autorizado para enviar mensajes en este chat');
      error.status = 403;
      throw error;
    }

    const messageId = await this.chatRepository.createMessage(idSolicitud, idEmisor, idReceptor, contenido);
    
    // Notify the receiver asynchronously
    try {
      await this.crearNotificacionUseCase.execute(
        idReceptor,
        'Nuevo mensaje recibido',
        'Tu vecino te ha enviado un nuevo mensaje en el chat de la solicitud.'
      );
    } catch (err) {
      console.error('Error sending notification in EnviarMensajeUseCase:', err);
    }

    return {
      id_mensaje: messageId,
      id_solicitud: idSolicitud,
      id_emisor: idEmisor,
      id_receptor: idReceptor,
      contenido,
      fecha_envio: mensaje.fecha_envio
    };
  }
}

module.exports = EnviarMensajeUseCase;
