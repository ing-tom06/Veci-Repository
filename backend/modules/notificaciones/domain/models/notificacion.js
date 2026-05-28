class Notificacion {
  constructor({ id_notification, id_usuario, titulo, mensaje, leido }) {
    this.id_notification = id_notification;
    this.id_usuario = id_usuario;
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.leido = leido ? 1 : 0;
  }

  validar() {
    if (!this.id_usuario) {
      const error = new Error('El ID de usuario es requerido para la notificación');
      error.status = 400;
      throw error;
    }
    if (!this.titulo || this.titulo.trim() === '') {
      const error = new Error('El título de la notificación no puede estar vacío');
      error.status = 400;
      throw error;
    }
    if (!this.mensaje || this.mensaje.trim() === '') {
      const error = new Error('El mensaje de la notificación no puede estar vacío');
      error.status = 400;
      throw error;
    }
  }
}

module.exports = Notificacion;
