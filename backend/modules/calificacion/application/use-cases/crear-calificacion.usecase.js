const Calificacion = require('../../domain/models/calificacion');

class CrearCalificacionUseCase {
  constructor(calificacionRepository) {
    this.calificacionRepository = calificacionRepository;
  }

  async execute(idSolicitud, idCalificador, puntaje, comentario) {
    const calificacion = new Calificacion({
      id_solicitud: idSolicitud,
      id_calificador: idCalificador,
      puntaje,
      comentario
    });

    calificacion.validar();

    const interaction = await this.calificacionRepository.getSolicitudInteraction(idSolicitud);
    if (!interaction) {
      const error = new Error('No se encontró interacción para esta solicitud');
      error.status = 404;
      throw error;
    }

    if (interaction.estado_solicitud !== 'FINALIZADA') {
      const error = new Error('Solo se puede calificar una solicitud cuando está FINALIZADA');
      error.status = 400;
      throw error;
    }

    if (interaction.id_adulto_mayor !== idCalificador && interaction.id_voluntario !== idCalificador) {
      const error = new Error('No estás autorizado para calificar esta solicitud');
      error.status = 403;
      throw error;
    }

    const idCalificado = Number(idCalificador) === Number(interaction.id_voluntario)
      ? interaction.id_adulto_mayor
      : interaction.id_voluntario;

    if (!idCalificado) {
      const error = new Error('No se pudo determinar el usuario a calificar (no hay voluntario asignado)');
      error.status = 400;
      throw error;
    }

    const existing = await this.calificacionRepository.getCalificacionBySolicitudAndCalificador(idSolicitud, idCalificador);
    if (existing) {
      const error = new Error('Ya has calificado esta interacción');
      error.status = 400;
      throw error;
    }

    const insertId = await this.calificacionRepository.createCalificacion(
      idSolicitud,
      idCalificador,
      idCalificado,
      calificacion.puntaje,
      comentario
    );

    return {
      id_calificacion: insertId,
      id_solicitud: idSolicitud,
      id_calificador: idCalificador,
      id_calificado: idCalificado,
      puntaje: calificacion.puntaje,
      comentario
    };
  }
}

module.exports = CrearCalificacionUseCase;
