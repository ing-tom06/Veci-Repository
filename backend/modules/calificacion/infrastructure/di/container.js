const dbPool = require('../../../../config/db');

// Adaptador de salida (Output Adapter)
const MySQLCalificacionRepository = require('../adapters/output/mysql-calificacion.repository');

// Casos de Uso (Use Cases)
const CrearCalificacionUseCase = require('../../application/use-cases/crear-calificacion.usecase');
const ObtenerCalificacionesForUserUseCase = require('../../application/use-cases/obtener-calificaciones-for-user.usecase');
const CheckRatingStatusUseCase = require('../../application/use-cases/check-rating-status.usecase');

// Instanciación del repositorio
const calificacionRepository = new MySQLCalificacionRepository(dbPool);

// Instanciación de Casos de Uso
const crearCalificacionUseCase = new CrearCalificacionUseCase(calificacionRepository);
const obtenerCalificacionesForUserUseCase = new ObtenerCalificacionesForUserUseCase(calificacionRepository);
const checkRatingStatusUseCase = new CheckRatingStatusUseCase(calificacionRepository);

// Adaptador de entrada (Input Adapter)
const CalificacionController = require('../adapters/input/calificacion.controller');
const calificacionController = new CalificacionController(
  crearCalificacionUseCase,
  obtenerCalificacionesForUserUseCase,
  checkRatingStatusUseCase
);

module.exports = {
  calificacionController,
  calificacionRepository
};
