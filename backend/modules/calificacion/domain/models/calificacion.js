class Calificacion {
  constructor({ id_calificacion, id_solicitud, id_calificador, id_calificado, puntaje, comentario }) {
    this.id_calificacion = id_calificacion;
    this.id_solicitud = id_solicitud;
    this.id_calificador = id_calificador;
    this.id_calificado = id_calificado;
    this.puntaje = Number(puntaje);
    this.comentario = comentario;
  }

  validar() {
    if (isNaN(this.puntaje) || this.puntaje < 1 || this.puntaje > 5) {
      const error = new Error('La calificación debe ser un número entero entre 1 y 5');
      error.status = 400;
      throw error;
    }
  }
}

module.exports = Calificacion;
