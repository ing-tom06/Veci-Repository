const Solicitud = require('../../domain/models/solicitud');

class CrearSolicitudUseCase {
  constructor(solicitudRepository, historialLogger) {
    this.solicitudRepository = solicitudRepository;
    this.historialLogger = historialLogger;
  }

  async execute(idUsuario, datosSolicitud) {
    const solicitud = new Solicitud({
      id_usuario: idUsuario,
      categoria: datosSolicitud.categoria,
      descripcion: datosSolicitud.descripcion,
      direccion: datosSolicitud.direccion,
      fecha_servicio: datosSolicitud.fecha_servicio,
      estado: 'ABIERTA'
    });

    solicitud.validar();

    const idSolicitud = await this.solicitudRepository.create(solicitud);
    await this.historialLogger.registrar(idSolicitud, idUsuario, 'ABIERTA', solicitud.fecha_servicio);

    return idSolicitud;
  }
}

module.exports = CrearSolicitudUseCase;
