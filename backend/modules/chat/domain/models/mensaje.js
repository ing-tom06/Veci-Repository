class Mensaje {
  constructor({ id_mensaje, id_solicitud, id_emisor, id_receptor, contenido, fecha_envio }) {
    this.id_mensaje = id_mensaje;
    this.id_solicitud = id_solicitud;
    this.id_emisor = id_emisor;
    this.id_receptor = id_receptor;
    this.contenido = contenido;
    this.fecha_envio = fecha_envio || new Date();
  }

  validar() {
    if (!this.contenido || this.contenido.trim() === '') {
      const error = new Error('El mensaje no puede estar vacío');
      error.status = 400;
      throw error;
    }
  }
}

module.exports = Mensaje;
