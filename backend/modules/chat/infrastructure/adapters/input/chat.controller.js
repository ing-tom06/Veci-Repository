class ChatController {
  constructor(obtenerConversacionesUseCase, obtenerMensajesUseCase, enviarMensajeUseCase) {
    this.obtenerConversacionesUseCase = obtenerConversacionesUseCase;
    this.obtenerMensajesUseCase = obtenerMensajesUseCase;
    this.enviarMensajeUseCase = enviarMensajeUseCase;
  }

  getConversations = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const rol = req.user.rol;
      const conversations = await this.obtenerConversacionesUseCase.execute(idUsuario, rol);
      res.json(conversations);
    } catch (error) {
      console.error('Error in getConversations:', error);
      res.status(500).json({ message: 'Error al obtener las conversaciones' });
    }
  }

  getMessages = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const { id_solicitud } = req.params;
      const messages = await this.obtenerMensajesUseCase.execute(Number(id_solicitud), idUsuario);
      res.json(messages);
    } catch (error) {
      console.error('Error in getMessages:', error);
      const status = error.status || 500;
      const message = error.message || 'Error al obtener los mensajes';
      res.status(status).json({ message });
    }
  }

  sendMessage = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const { id_solicitud, contenido } = req.body;
      const message = await this.enviarMensajeUseCase.execute(Number(id_solicitud), idUsuario, contenido);
      res.status(201).json(message);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      const status = error.status || 500;
      const message = error.message || 'Error al enviar el mensaje';
      res.status(status).json({ message });
    }
  }
}

module.exports = ChatController;
