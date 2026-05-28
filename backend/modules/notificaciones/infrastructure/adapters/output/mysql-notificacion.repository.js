const NotificacionRepositoryPort = require('../../../domain/ports/notificacion-repository.port');

class MySQLNotificacionRepository extends NotificacionRepositoryPort {
  constructor(dbPool) {
    super();
    this.db = dbPool;
  }

  async createNotification(idUsuario, titulo, mensaje) {
    const [result] = await this.db.execute(
      `INSERT INTO notificacion (id_usuario, titulo, mensaje, leido)
       VALUES (?, ?, ?, 0)`,
      [idUsuario, titulo, mensaje]
    );
    return result.insertId;
  }

  async getNotificationsForUser(idUsuario) {
    const [rows] = await this.db.execute(
      `SELECT * FROM notificacion
       WHERE id_usuario = ?
       ORDER BY id_notification DESC`,
      [idUsuario]
    );
    return rows;
  }

  async markAsRead(idNotification, idUsuario) {
    const [result] = await this.db.execute(
      `UPDATE notificacion
       SET leido = 1
       WHERE id_notification = ? AND id_usuario = ?`,
      [idNotification, idUsuario]
    );
    return result.affectedRows > 0;
  }
}

module.exports = MySQLNotificacionRepository;
