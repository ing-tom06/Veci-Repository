class NotificacionController {
  constructor(obtenerNotificacionesUseCase, marcarLeidaUseCase) {
    this.obtenerNotificacionesUseCase = obtenerNotificacionesUseCase;
    this.marcarLeidaUseCase = marcarLeidaUseCase;
  }

  getNotifications = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const notifications = await this.obtenerNotificacionesUseCase.execute(idUsuario);
      res.json(notifications);
    } catch (error) {
      console.error('Error in getNotifications:', error);
      res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
  }

  markAsRead = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const { id } = req.params;
      const result = await this.marcarLeidaUseCase.execute(Number(id), idUsuario);
      res.json({ message: 'Notificación marcada como leída', result });
    } catch (error) {
      console.error('Error in markAsRead:', error);
      const status = error.status || 500;
      const message = error.message || 'Error al actualizar la notificación';
      res.status(status).json({ message });
    }
  }
}

module.exports = NotificacionController;
