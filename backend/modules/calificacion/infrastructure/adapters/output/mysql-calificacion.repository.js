const CalificacionRepositoryPort = require('../../../domain/ports/calificacion-repository.port');

class MySQLCalificacionRepository extends CalificacionRepositoryPort {
  constructor(dbPool) {
    super();
    this.db = dbPool;
  }

  async createCalificacion(idSolicitud, idCalificador, idCalificado, puntaje, comentario) {
    const [result] = await this.db.execute(
      `INSERT INTO calificacion (id_solicitud, id_calificador, id_calificado, puntaje, comentario)
       VALUES (?, ?, ?, ?, ?)`,
      [idSolicitud, idCalificador, idCalificado, puntaje, comentario]
    );
    return result.insertId;
  }

  async getCalificacionBySolicitudAndCalificador(idSolicitud, idCalificador) {
    const [rows] = await this.db.execute(
      `SELECT * FROM calificacion WHERE id_solicitud = ? AND id_calificador = ?`,
      [idSolicitud, idCalificador]
    );
    return rows[0];
  }

  async getCalificacionesForUser(idUsuario) {
    const [rows] = await this.db.execute(
      `SELECT c.*, p.nombre AS calificador_nombre, p.apellido AS calificador_apellido, p.foto_perfil AS calificador_foto
       FROM calificacion c
       JOIN perfil p ON c.id_calificador = p.id_usuario
       WHERE c.id_calificado = ?
       ORDER BY c.id_calificacion DESC`,
      [idUsuario]
    );
    return rows;
  }

  async getSolicitudInteraction(idSolicitud) {
    const [rows] = await this.db.execute(
      `SELECT s.id_usuario AS id_adulto_mayor, o.id_voluntario, s.estado AS estado_solicitud
       FROM solicitud s
       LEFT JOIN oferta o ON s.id_solicitud = o.id_solicitud AND o.estado_oferta IN ('ACEPTADA', 'FINALIZADA')
       WHERE s.id_solicitud = ?`,
      [idSolicitud]
    );
    return rows[0];
  }
}

module.exports = MySQLCalificacionRepository;
