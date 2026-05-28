class CalificacionController {
  constructor(crearCalificacionUseCase, obtenerCalificacionesForUserUseCase, checkRatingStatusUseCase) {
    this.crearCalificacionUseCase = crearCalificacionUseCase;
    this.obtenerCalificacionesForUserUseCase = obtenerCalificacionesForUserUseCase;
    this.checkRatingStatusUseCase = checkRatingStatusUseCase;
  }

  createCalificacion = async (req, res) => {
    try {
      const idCalificador = req.user.id;
      const { id_solicitud, puntaje, comentario } = req.body;
      
      const calificacion = await this.crearCalificacionUseCase.execute(
        Number(id_solicitud),
        idCalificador,
        puntaje,
        comentario
      );
      
      res.status(201).json({
        message: 'Calificación registrada exitosamente',
        calificacion
      });
    } catch (error) {
      console.error('Error in createCalificacion:', error);
      const status = error.status || 500;
      const message = error.message || 'Error al registrar calificación';
      res.status(status).json({ message });
    }
  }

  getMisCalificaciones = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const calificaciones = await this.obtenerCalificacionesForUserUseCase.execute(idUsuario);
      res.json(calificaciones);
    } catch (error) {
      console.error('Error in getMisCalificaciones:', error);
      res.status(500).json({ message: 'Error al obtener calificaciones' });
    }
  }

  getUserCalificaciones = async (req, res) => {
    try {
      const { id_usuario } = req.params;
      const calificaciones = await this.obtenerCalificacionesForUserUseCase.execute(Number(id_usuario));
      res.json(calificaciones);
    } catch (error) {
      console.error('Error in getUserCalificaciones:', error);
      res.status(500).json({ message: 'Error al obtener calificaciones del usuario' });
    }
  }

  checkRatingStatus = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const { id_solicitud } = req.params;
      const status = await this.checkRatingStatusUseCase.execute(Number(id_solicitud), idUsuario);
      res.json(status);
    } catch (error) {
      console.error('Error in checkRatingStatus:', error);
      res.status(500).json({ message: 'Error al verificar elegibilidad de calificación' });
    }
  }
}

module.exports = CalificacionController;
