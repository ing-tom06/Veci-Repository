const dbPool = require('../../../../config/db');

// Adaptador de salida (Output Adapter)
const MySQLNotificacionRepository = require('../adapters/output/mysql-notificacion.repository');

// Casos de Uso (Use Cases)
const CrearNotificacionUseCase = require('../../application/use-cases/crear-notificacion.usecase');
const ObtenerNotificacionesUseCase = require('../../application/use-cases/obtener-notificaciones.usecase');
const MarcarLeidaUseCase = require('../../application/use-cases/marcar-leida.usecase');

// Instanciación del repositorio
const notificacionRepository = new MySQLNotificacionRepository(dbPool);

// Instanciación de Casos de Uso
const crearNotificacionUseCase = new CrearNotificacionUseCase(notificacionRepository);
const obtenerNotificacionesUseCase = new ObtenerNotificacionesUseCase(notificacionRepository);
const marcarLeidaUseCase = new MarcarLeidaUseCase(notificacionRepository);

// Adaptador de entrada (Input Adapter)
const NotificacionController = require('../adapters/input/notificacion.controller');
const notificacionController = new NotificacionController(
  obtenerNotificacionesUseCase,
  marcarLeidaUseCase
);

module.exports = {
  notificacionController,
  notificacionRepository,
  crearNotificacionUseCase
};
