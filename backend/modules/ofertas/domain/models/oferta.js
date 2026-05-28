class Oferta {
  constructor({ id_oferta, id_voluntario, id_solicitud, estado_oferta, fecha_oferta }) {
    this.id_oferta = id_oferta;
    this.id_voluntario = id_voluntario;
    this.id_solicitud = id_solicitud;
    this.estado_oferta = estado_oferta || 'PENDIENTE';
    this.fecha_oferta = fecha_oferta;
  }

  isAceptada() {
    return this.estado_oferta === 'ACEPTADA';
  }
}

module.exports = Oferta;
