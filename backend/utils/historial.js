const db = require('../config/db');

async function registrarHistorial(id_solicitud, id_actor, estado_solicitud, fecha_cita = null, connection = null) {
  try {
    const conn = connection || db;
    let finalFechaCita = fecha_cita;
    if (!finalFechaCita) {
      const [rows] = await conn.execute('SELECT fecha_servicio FROM solicitud WHERE id_solicitud = ?', [id_solicitud]);
      if (rows && rows.length > 0) {
        finalFechaCita = rows[0].fecha_servicio;
      }
    }

    await conn.execute(
      `INSERT INTO historial (id_solicitud, id_actor, estado_solicitud, fecha_cita)
       VALUES (?, ?, ?, ?)`,
      [id_solicitud, id_actor, estado_solicitud, finalFechaCita]
    );
    console.log(`[Historial] Registered transition to '${estado_solicitud}' for request ${id_solicitud} by user ${id_actor}`);
  } catch (error) {
    console.error('Error registering historial transition:', error);
  }
}

module.exports = { registrarHistorial };
