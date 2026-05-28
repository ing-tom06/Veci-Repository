const PerfilRepositoryPort = require('../../../domain/ports/perfil-repository.port');
const Perfil = require('../../../domain/models/perfil');

class MySQLPerfilRepository extends PerfilRepositoryPort {
  constructor(dbPool) {
    super();
    this.db = dbPool;
  }

  async getPerfilById(idUsuario) {
    const [rows] = await this.db.execute(
      `SELECT p.*, u.correo, u.rol,
              COALESCE((SELECT AVG(puntaje) FROM calificacion WHERE id_calificado = p.id_usuario), 0) AS promedio_calificaciones
       FROM perfil p 
       JOIN usuario u ON p.id_usuario = u.id_usuario 
       WHERE p.id_usuario = ?`,
      [idUsuario]
    );
    if (!rows[0]) return null;
    return new Perfil(rows[0]);
  }

  async updatePerfil(idUsuario, perfil) {
    const { nombre, apellido, edad, telefono, documento_identidad, foto_perfil } = perfil;
    
    let query = 'UPDATE perfil SET nombre = ?, apellido = ?, edad = ?, telefono = ?, documento_identidad = ?';
    let params = [nombre, apellido, edad || null, telefono || null, documento_identidad || null];

    if (foto_perfil) {
      query += ', foto_perfil = ?';
      params.push(foto_perfil);
    }

    query += ' WHERE id_usuario = ?';
    params.push(idUsuario);

    await this.db.execute(query, params);
  }
}

module.exports = MySQLPerfilRepository;
