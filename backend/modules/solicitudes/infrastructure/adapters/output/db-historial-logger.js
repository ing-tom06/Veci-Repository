const HistorialLoggerPort = require('../../../domain/ports/historial-logger.port');
const { registrarHistorial } = require('../../../../../utils/historial');

class DBHistorialLogger extends HistorialLoggerPort {
  constructor(dbPool) {
    super();
    this.db = dbPool;
  }

  async registrar(idSolicitud, idActor, estadoSolicitud, fechaCita = null, connection = null) {
    const conn = connection || this.db;
    await registrarHistorial(idSolicitud, idActor, estadoSolicitud, fechaCita, conn);
  }
}

module.exports = DBHistorialLogger;
