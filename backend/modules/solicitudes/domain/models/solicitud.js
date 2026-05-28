class Solicitud {
  constructor({ id_solicitud, id_usuario, categoria, descripcion, direccion, fecha_servicio, estado }) {
    this.id_solicitud = id_solicitud;
    this.id_usuario = id_usuario;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.direccion = direccion;
    this.fecha_servicio = fecha_servicio;
    this.estado = estado || 'ABIERTA';
  }

  validar() {
    if (!this.categoria || !this.descripcion || !this.direccion || !this.fecha_servicio) {
      throw new Error('Todos los campos son obligatorios.');
    }

    if (this.descripcion.length < 10) {
      throw new Error('La descripción debe tener al menos 10 caracteres.');
    }

    const fecha = new Date(this.fecha_servicio);
    if (isNaN(fecha.getTime())) {
      throw new Error('La fecha de servicio no es válida.');
    }
  }
}

module.exports = Solicitud;
