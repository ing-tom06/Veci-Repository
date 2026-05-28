const ChatRepositoryPort = require('../../../domain/ports/chat-repository.port');

class MySQLChatRepository extends ChatRepositoryPort {
  constructor(dbPool) {
    super();
    this.db = dbPool;
  }

  async getConversations(idUsuario, rol) {
    const isVoluntario = rol.trim().toLowerCase() === 'voluntario';
    
    const query = isVoluntario
      ? `SELECT s.id_solicitud, s.categoria, s.descripcion, s.estado,
                 p.nombre AS contraparte_nombre, p.apellido AS contraparte_apellido, p.foto_perfil AS contraparte_foto,
                 s.id_usuario AS id_adulto_mayor, o.id_voluntario
          FROM solicitud s
          JOIN oferta o ON s.id_solicitud = o.id_solicitud
          JOIN perfil p ON s.id_usuario = p.id_usuario
          WHERE o.id_voluntario = ? AND o.estado_oferta = 'ACEPTADA'
          ORDER BY s.fecha_servicio DESC`
      : `SELECT s.id_solicitud, s.categoria, s.descripcion, s.estado,
                 p.nombre AS contraparte_nombre, p.apellido AS contraparte_apellido, p.foto_perfil AS contraparte_foto,
                 s.id_usuario AS id_adulto_mayor, o.id_voluntario
          FROM solicitud s
          JOIN oferta o ON s.id_solicitud = o.id_solicitud
          JOIN perfil p ON o.id_voluntario = p.id_usuario
          WHERE s.id_usuario = ? AND o.estado_oferta = 'ACEPTADA'
          ORDER BY s.fecha_servicio DESC`;

    const [rows] = await this.db.execute(query, [idUsuario]);
    return rows;
  }

  async getMessagesBySolicitud(idSolicitud) {
    const [rows] = await this.db.execute(
      `SELECT m.*, p.nombre AS emisor_nombre, p.apellido AS emisor_apellido
       FROM mensaje m
       JOIN perfil p ON m.id_emisor = p.id_usuario
       WHERE m.id_solicitud = ?
       ORDER BY m.fecha_envio ASC`,
      [idSolicitud]
    );
    return rows;
  }

  async createMessage(idSolicitud, idEmisor, idReceptor, contenido) {
    const [result] = await this.db.execute(
      `INSERT INTO mensaje (id_solicitud, id_emisor, id_receptor, contenido)
       VALUES (?, ?, ?, ?)`,
      [idSolicitud, idEmisor, idReceptor, contenido]
    );
    return result.insertId;
  }

  async getSolicitudInteraction(idSolicitud) {
    const [rows] = await this.db.execute(
      `SELECT s.id_usuario AS id_adulto_mayor, o.id_voluntario, s.estado AS estado_solicitud
       FROM solicitud s
       JOIN oferta o ON s.id_solicitud = o.id_solicitud
       WHERE s.id_solicitud = ? AND o.estado_oferta = 'ACEPTADA'`,
      [idSolicitud]
    );
    return rows[0];
  }
}

module.exports = MySQLChatRepository;
