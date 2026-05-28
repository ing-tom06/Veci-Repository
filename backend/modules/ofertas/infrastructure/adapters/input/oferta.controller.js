class OfertaController {
  constructor(
    crearOfertaUseCase,
    obtenerMisOfertasActivasUseCase,
    obtenerHistorialVoluntarioUseCase,
    obtenerOfertasBySolicitudUseCase,
    aceptarOfertaUseCase,
    rechazarOfertaUseCase
  ) {
    this.crearOfertaUseCase = crearOfertaUseCase;
    this.obtenerMisOfertasActivasUseCase = obtenerMisOfertasActivasUseCase;
    this.obtenerHistorialVoluntarioUseCase = obtenerHistorialVoluntarioUseCase;
    this.obtenerOfertasBySolicitudUseCase = obtenerOfertasBySolicitudUseCase;
    this.aceptarOfertaUseCase = aceptarOfertaUseCase;
    this.rechazarOfertaUseCase = rechazarOfertaUseCase;
  }

  createOferta = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const { id_solicitud } = req.body;
      const idOferta = await this.crearOfertaUseCase.execute(idUsuario, id_solicitud);
      res.status(201).json({ message: 'Oferta creada exitosamente', id_oferta: idOferta });
    } catch (error) {
      console.error('Error in createOferta:', error);
      const status = error.message.includes('requiere') ? 400 : 500;
      res.status(status).json({ message: error.message || 'Error al crear oferta' });
    }
  }

  getMisOfertasActivas = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const ofertas = await this.obtenerMisOfertasActivasUseCase.execute(idUsuario);
      res.json(ofertas);
    } catch (error) {
      console.error('Error in getMisOfertasActivas:', error);
      res.status(500).json({ message: 'Error al obtener ofertas' });
    }
  }

  getHistorial = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const historial = await this.obtenerHistorialVoluntarioUseCase.execute(idUsuario);
      res.json(historial);
    } catch (error) {
      console.error('Error in getHistorialVoluntario:', error);
      res.status(500).json({ message: 'Error al obtener historial' });
    }
  }

  getOfertasBySolicitud = async (req, res) => {
    try {
      const { id_solicitud } = req.params;
      const ofertas = await this.obtenerOfertasBySolicitudUseCase.execute(id_solicitud);
      res.json(ofertas);
    } catch (error) {
      console.error('Error in getOfertasBySolicitud:', error);
      res.status(500).json({ message: 'Error al obtener ofertas de la solicitud' });
    }
  }

  acceptOferta = async (req, res) => {
    try {
      const idOferta = parseInt(req.params.id_oferta, 10);
      const { id_solicitud } = req.body;
      const idActor = req.user.id;
      await this.aceptarOfertaUseCase.execute(idOferta, id_solicitud, idActor);
      res.json({ message: 'Oferta aceptada exitosamente' });
    } catch (error) {
      console.error('Error in acceptOferta:', error);
      const status = error.message.includes('inválidos') ? 400 : 500;
      res.status(status).json({ message: error.message || 'Error al aceptar la oferta' });
    }
  }

  rejectOferta = async (req, res) => {
    try {
      const idOferta = parseInt(req.params.id_oferta, 10);
      await this.rechazarOfertaUseCase.execute(idOferta);
      res.json({ message: 'Oferta rechazada' });
    } catch (error) {
      console.error('Error in rejectOferta:', error);
      const status = error.message.includes('inválido') ? 400 : 500;
      res.status(status).json({ message: error.message || 'Error al rechazar la oferta' });
    }
  }
}

module.exports = OfertaController;
