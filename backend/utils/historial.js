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

async function autoCompletePastSolicitudes(connection = null) {
  try {
    const conn = connection || db;
    
    // 1. Buscar solicitudes 'ASIGNADA' cuya fecha de servicio ya pasó
    const [pastSolicitudes] = await conn.execute(
      `SELECT id_solicitud, id_usuario FROM solicitud 
       WHERE estado = 'ASIGNADA' AND DATE(fecha_servicio) < CURDATE()`
    );
    
    if (pastSolicitudes.length > 0) {
      const ids = pastSolicitudes.map(s => s.id_solicitud);
      
      // Actualizar el estado de las solicitudes a 'FINALIZADA'
      await conn.execute(
        `UPDATE solicitud SET estado = 'FINALIZADA' 
         WHERE id_solicitud IN (${ids.join(',')})`
      );
      
      // Actualizar el estado de las ofertas aceptadas asociadas a 'FINALIZADA'
      await conn.execute(
        `UPDATE oferta SET estado_oferta = 'FINALIZADA' 
         WHERE id_solicitud IN (${ids.join(',')}) AND estado_oferta = 'ACEPTADA'`
      );
      
      // Registrar la transición en el historial de manera automática
      for (const sol of pastSolicitudes) {
        const [histRows] = await conn.execute(
          `SELECT 1 FROM historial WHERE id_solicitud = ? AND estado_solicitud = 'FINALIZADA'`,
          [sol.id_solicitud]
        );
        if (histRows.length === 0) {
          await conn.execute(
            `INSERT INTO historial (id_solicitud, id_actor, estado_solicitud, fecha_cita)
             VALUES (?, ?, 'FINALIZADA', (SELECT fecha_servicio FROM solicitud WHERE id_solicitud = ?))`,
            [sol.id_solicitud, sol.id_usuario, sol.id_solicitud]
          );
        }
      }
      console.log(`[Auto-Complete] Successfully completed ${pastSolicitudes.length} past due requests: ${ids.join(', ')}`);
    }
  } catch (error) {
    console.error('[Auto-Complete] Error running auto-complete for past due requests:', error);
  }
}

module.exports = { registrarHistorial, autoCompletePastSolicitudes };
