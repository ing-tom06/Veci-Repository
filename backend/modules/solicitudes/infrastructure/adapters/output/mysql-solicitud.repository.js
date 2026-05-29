const SolicitudRepositoryPort = require('../../../domain/ports/solicitud-repository.port');
const Solicitud = require('../../../domain/models/solicitud');
const { registrarHistorial, autoCompletePastSolicitudes } = require('../../../../../utils/historial');

class MySQLSolicitudRepository extends SolicitudRepositoryPort {
  constructor(dbPool) {
    super();
    this.db = dbPool;
  }

  async create(solicitud) {
    const [result] = await this.db.execute(
      `INSERT INTO solicitud (id_usuario, categoria, descripcion, direccion, fecha_servicio, estado)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        solicitud.id_usuario,
        solicitud.categoria,
        solicitud.descripcion,
        solicitud.direccion,
        solicitud.fecha_servicio,
        solicitud.estado
      ]
    );
    return result.insertId;
  }

  async findAbiertas(idVoluntario) {
    const [rows] = await this.db.execute(
      `SELECT s.*, p.nombre, p.apellido, p.foto_perfil 
       FROM solicitud s 
       JOIN perfil p ON s.id_usuario = p.id_usuario 
       WHERE s.estado = 'ABIERTA' 
       AND DATE(s.fecha_servicio) >= CURDATE()
       AND NOT EXISTS (
           SELECT 1 FROM oferta o WHERE o.id_solicitud = s.id_solicitud AND o.id_voluntario = ?
       )
       ORDER BY s.fecha_servicio ASC`,
      [idVoluntario]
    );
    return rows;
  }

  async findByUserId(idUsuario) {
    await autoCompletePastSolicitudes(this.db);
    const [rows] = await this.db.execute(
      `SELECT * FROM solicitud 
       WHERE id_usuario = ? 
       AND (estado = 'ASIGNADA' OR (estado = 'ABIERTA' AND DATE(fecha_servicio) >= CURDATE()))
       ORDER BY fecha_servicio DESC`,
      [idUsuario]
    );
    return rows.map(row => new Solicitud(row));
  }

  async findHistorialByUserId(idUsuario) {
    await autoCompletePastSolicitudes(this.db);
    const [rows] = await this.db.execute(
      `SELECT id_solicitud, id_usuario, categoria, descripcion, direccion, fecha_servicio,
       CASE 
         WHEN estado = 'CANCELADA' OR estado = 'RECHAZADA' THEN 'rechazada'
         WHEN estado = 'ABIERTA' THEN 'sin respuesta'
         WHEN estado = 'FINALIZADA' THEN 'completada'
         ELSE 'completada'
       END AS estado
       FROM solicitud 
       WHERE id_usuario = ? 
       AND (estado IN ('FINALIZADA', 'CANCELADA', 'RECHAZADA') OR (estado = 'ABIERTA' AND DATE(fecha_servicio) < CURDATE()))
       ORDER BY fecha_servicio DESC`,
      [idUsuario]
    );
    return rows;
  }

  async findById(idSolicitud) {
    const [rows] = await this.db.execute(
      `SELECT * FROM solicitud WHERE id_solicitud = ?`,
      [idSolicitud]
    );
    return rows[0] ? new Solicitud(rows[0]) : null;
  }

  async updateEstado(idSolicitud, estado, connection = null) {
    const conn = connection || this.db;
    const [result] = await conn.execute(
      `UPDATE solicitud SET estado = ? WHERE id_solicitud = ?`,
      [estado, idSolicitud]
    );
    return result.affectedRows > 0;
  }

  async completeSolicitud(idSolicitud, idActor) {
    const connection = await this.db.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.execute(
        `UPDATE solicitud SET estado = 'FINALIZADA' WHERE id_solicitud = ?`,
        [idSolicitud]
      );

      await connection.execute(
        `UPDATE oferta SET estado_oferta = 'FINALIZADA' WHERE id_solicitud = ? AND estado_oferta = 'ACEPTADA'`,
        [idSolicitud]
      );

      if (result.affectedRows > 0) {
        await registrarHistorial(idSolicitud, idActor, 'FINALIZADA', null, connection);
      }

      await connection.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = MySQLSolicitudRepository;
