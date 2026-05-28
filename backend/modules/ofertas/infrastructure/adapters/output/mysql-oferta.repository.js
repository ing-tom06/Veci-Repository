const OfertaRepositoryPort = require('../../../domain/ports/oferta-repository.port');
const { registrarHistorial } = require('../../../../../utils/historial');

class MySQLOfertaRepository extends OfertaRepositoryPort {
  constructor(dbPool) {
    super();
    this.db = dbPool;
  }

  async createOferta(idUsuario, idSolicitud) {
    const [result] = await this.db.execute(
      `INSERT INTO oferta (id_voluntario, id_solicitud, estado_oferta) VALUES (?, ?, 'PENDIENTE')`,
      [idUsuario, idSolicitud]
    );
    return result.insertId;
  }

  async getMisOfertasActivas(idUsuario) {
    const [rows] = await this.db.execute(
      `SELECT o.id_oferta, o.id_solicitud, o.id_voluntario, o.estado_oferta AS estado, o.fecha_oferta, s.categoria, s.descripcion, s.direccion, s.fecha_servicio 
       FROM oferta o 
       JOIN solicitud s ON o.id_solicitud = s.id_solicitud 
       WHERE o.id_voluntario = ? 
       AND (o.estado_oferta = 'ACEPTADA' OR (o.estado_oferta = 'PENDIENTE' AND DATE(s.fecha_servicio) >= CURDATE()))
       ORDER BY s.fecha_servicio ASC`,
      [idUsuario]
    );
    return rows;
  }

  async getHistorialVoluntario(idUsuario) {
    const [rows] = await this.db.execute(
      `SELECT o.id_oferta, o.id_solicitud, o.id_voluntario, 
       CASE 
         WHEN o.estado_oferta = 'CANCELADA' OR o.estado_oferta = 'RECHAZADA' THEN 'rechazada'
         WHEN o.estado_oferta = 'PENDIENTE' THEN 'sin respuesta'
         WHEN o.estado_oferta = 'FINALIZADA' THEN 'completada'
         ELSE 'completada'
       END AS estado,
       o.fecha_oferta, s.categoria, s.descripcion, s.direccion, s.fecha_servicio 
       FROM oferta o 
       JOIN solicitud s ON o.id_solicitud = s.id_solicitud 
       WHERE o.id_voluntario = ? 
       AND (o.estado_oferta IN ('FINALIZADA', 'RECHAZADA', 'CANCELADA') OR (o.estado_oferta = 'PENDIENTE' AND DATE(s.fecha_servicio) < CURDATE()))
       ORDER BY s.fecha_servicio DESC`,
      [idUsuario]
    );
    return rows;
  }

  async getOfertasBySolicitud(idSolicitud) {
    const [rows] = await this.db.execute(
      `SELECT o.id_oferta, o.id_solicitud, o.id_voluntario, o.estado_oferta AS estado, o.fecha_oferta, p.nombre, p.apellido, p.foto_perfil, p.edad 
       FROM oferta o 
       JOIN perfil p ON o.id_voluntario = p.id_usuario 
       WHERE o.id_solicitud = ?`,
      [idSolicitud]
    );
    return rows;
  }

  async acceptOferta(idOferta, idSolicitud, idActor) {
    const connection = await this.db.getConnection();
    try {
      await connection.beginTransaction();

      await connection.execute(
        `UPDATE oferta SET estado_oferta = 'ACEPTADA' WHERE id_oferta = ?`,
        [idOferta]
      );

      await connection.execute(
        `UPDATE solicitud SET estado = 'ASIGNADA' WHERE id_solicitud = ?`,
        [idSolicitud]
      );

      await connection.execute(
        `UPDATE oferta SET estado_oferta = 'RECHAZADA' WHERE id_solicitud = ? AND id_oferta != ? AND estado_oferta = 'PENDIENTE'`,
        [idSolicitud, idOferta]
      );

      await registrarHistorial(idSolicitud, idActor, 'ASIGNADA', null, connection);

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async rejectOferta(idOferta) {
    const [result] = await this.db.execute(
      `UPDATE oferta SET estado_oferta = 'RECHAZADA' WHERE id_oferta = ?`,
      [idOferta]
    );
    return result.affectedRows > 0;
  }

  async getSolicitudOwner(idSolicitud) {
    const [rows] = await this.db.execute(
      `SELECT id_usuario FROM solicitud WHERE id_solicitud = ?`,
      [idSolicitud]
    );
    return rows[0] ? rows[0].id_usuario : null;
  }

  async getOfertaDetails(idOferta) {
    const [rows] = await this.db.execute(
      `SELECT * FROM oferta WHERE id_oferta = ?`,
      [idOferta]
    );
    return rows[0];
  }
}

module.exports = MySQLOfertaRepository;
