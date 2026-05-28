const dbPool = require('../../../../config/db');

// Adaptadores de salida (Output Adapters)
const MySQLSolicitudRepository = require('../adapters/output/mysql-solicitud.repository');
const DBHistorialLogger = require('../adapters/output/db-historial-logger');

// Casos de Uso (Use Cases)
const CrearSolicitudUseCase = require('../../application/use-cases/crear-solicitud.usecase');
const ObtenerSolicitudesAbiertasUseCase = require('../../application/use-cases/obtener-solicitudes-abiertas.usecase');
const ObtenerMisSolicitudesUseCase = require('../../application/use-cases/obtener-mis-solicitudes.usecase');
const ObtenerHistorialAdultoMayorUseCase = require('../../application/use-cases/obtener-historial-adulto-mayor.usecase');
const CompletarSolicitudUseCase = require('../../application/use-cases/completar-solicitud.usecase');

// Instanciación de adaptadores de infraestructura
const solicitudRepository = new MySQLSolicitudRepository(dbPool);
const historialLogger = new DBHistorialLogger(dbPool);

// Instanciación de casos de uso de aplicación inyectando los puertos
const crearSolicitudUseCase = new CrearSolicitudUseCase(solicitudRepository, historialLogger);
const obtenerSolicitudesAbiertasUseCase = new ObtenerSolicitudesAbiertasUseCase(solicitudRepository);
const obtenerMisSolicitudesUseCase = new ObtenerMisSolicitudesUseCase(solicitudRepository);
const obtenerHistorialAdultoMayorUseCase = new ObtenerHistorialAdultoMayorUseCase(solicitudRepository);
const completarSolicitudUseCase = new CompletarSolicitudUseCase(solicitudRepository);

// Adaptador de entrada (Input Adapter)
const SolicitudController = require('../adapters/input/solicitud.controller');
const solicitudController = new SolicitudController(
  crearSolicitudUseCase,
  obtenerSolicitudesAbiertasUseCase,
  obtenerMisSolicitudesUseCase,
  obtenerHistorialAdultoMayorUseCase,
  completarSolicitudUseCase
);

module.exports = {
  solicitudController,
  solicitudRepository
};
