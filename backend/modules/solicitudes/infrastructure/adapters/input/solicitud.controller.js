class SolicitudController {
  constructor(
    crearSolicitudUseCase,
    obtenerSolicitudesAbiertasUseCase,
    obtenerMisSolicitudesUseCase,
    obtenerHistorialAdultoMayorUseCase,
    completarSolicitudUseCase
  ) {
    this.crearSolicitudUseCase = crearSolicitudUseCase;
    this.obtenerSolicitudesAbiertasUseCase = obtenerSolicitudesAbiertasUseCase;
    this.obtenerMisSolicitudesUseCase = obtenerMisSolicitudesUseCase;
    this.obtenerHistorialAdultoMayorUseCase = obtenerHistorialAdultoMayorUseCase;
    this.completarSolicitudUseCase = completarSolicitudUseCase;
  }

  createSolicitud = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const idSolicitud = await this.crearSolicitudUseCase.execute(idUsuario, req.body);
      res.status(201).json({ message: 'Solicitud creada exitosamente', id_solicitud: idSolicitud });
    } catch (error) {
      console.error('Error in createSolicitud:', error);
      const status = error.status || 400; // Domain validations thrown as standard Error have no status, default to 400
      const message = error.message || 'Error al crear solicitud';
      res.status(status).json({ message });
    }
  }

  getSolicitudesAbiertas = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const solicitudes = await this.obtenerSolicitudesAbiertasUseCase.execute(idUsuario);
      res.json(solicitudes);
    } catch (error) {
      console.error('Error in getSolicitudesAbiertas:', error);
      res.status(500).json({ message: 'Error al obtener solicitudes' });
    }
  }

  getMisSolicitudes = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const solicitudes = await this.obtenerMisSolicitudesUseCase.execute(idUsuario);
      res.json(solicitudes);
    } catch (error) {
      console.error('Error in getMisSolicitudes:', error);
      res.status(500).json({ message: 'Error al obtener mis solicitudes' });
    }
  }

  getHistorial = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const historial = await this.obtenerHistorialAdultoMayorUseCase.execute(idUsuario);
      res.json(historial);
    } catch (error) {
      console.error('Error in getHistorialAdultoMayor:', error);
      res.status(500).json({ message: 'Error al obtener historial' });
    }
  }

  completeSolicitud = async (req, res) => {
    try {
      const { id } = req.params;
      const idActor = req.user.id;
      const success = await this.completarSolicitudUseCase.execute(id, idActor);
      if (success) {
        res.json({ message: 'Solicitud marcada como completada' });
      } else {
        res.status(404).json({ message: 'Solicitud no encontrada' });
      }
    } catch (error) {
      console.error('Error in completeSolicitud:', error);
      res.status(500).json({ message: 'Error al completar la solicitud' });
    }
  }
}

module.exports = SolicitudController;
