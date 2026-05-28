const AuthRepositoryPort = require('../../../domain/ports/auth-repository.port');

class MySQLAuthRepository extends AuthRepositoryPort {
  constructor(dbPool) {
    super();
    this.db = dbPool;
  }

  async findByEmail(correo) {
    const [rows] = await this.db.execute('SELECT * FROM usuario WHERE correo = ?', [correo]);
    return rows;
  }
  
  async createUser(rol, correo, passwordHash, connection = null) {
    const conn = connection || this.db;
    const [result] = await conn.execute(
      'INSERT INTO usuario (rol, correo, contrasena) VALUES (?, ?, ?)',
      [rol, correo, passwordHash]
    );
    return result.insertId;
  }

  async createProfile(idUsuario, nombre, apellido, edad, telefono, documento_identidad, fotoPerfil, connection = null) {
    const conn = connection || this.db;
    await conn.execute(
      'INSERT INTO perfil (id_usuario, nombre, apellido, edad, telefono, documento_identidad, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [idUsuario, nombre, apellido, edad || null, telefono || null, documento_identidad || null, fotoPerfil]
    );
  }

  async findProfileByUserId(idUsuario) {
    const [rows] = await this.db.execute(
      `SELECT *,
              COALESCE((SELECT AVG(puntaje) FROM calificacion WHERE id_calificado = id_usuario), 0) AS promedio_calificaciones
       FROM perfil WHERE id_usuario = ?`,
      [idUsuario]
    );
    return rows[0];
  }
}

module.exports = MySQLAuthRepository;
