const dbPool = require('../../../../config/db');

// Adaptador de salida (Output Adapter)
const MySQLOfertaRepository = require('../adapters/output/mysql-oferta.repository');

// Importar Caso de Uso de Notificaciones de forma cruzada
const { crearNotificacionUseCase } = require('../../../notificaciones/infrastructure/di/container');

// Casos de Uso (Use Cases)
const CrearOfertaUseCase = require('../../application/use-cases/crear-oferta.usecase');
const ObtenerMisOfertasActivasUseCase = require('../../application/use-cases/obtener-mis-ofertas-activas.usecase');
const ObtenerHistorialVoluntarioUseCase = require('../../application/use-cases/obtener-historial-voluntario.usecase');
const ObtenerOfertasBySolicitudUseCase = require('../../application/use-cases/obtener-ofertas-by-solicitud.usecase');
const AceptarOfertaUseCase = require('../../application/use-cases/aceptar-oferta.usecase');
const RechazarOfertaUseCase = require('../../application/use-cases/rechazar-oferta.usecase');

// Instanciación del repositorio
const ofertaRepository = new MySQLOfertaRepository(dbPool);

// Instanciación de Casos de Uso con Inyección de Dependencias cruzada
const crearOfertaUseCase = new CrearOfertaUseCase(ofertaRepository, crearNotificacionUseCase);
const obtenerMisOfertasActivasUseCase = new ObtenerMisOfertasActivasUseCase(ofertaRepository);
const obtenerHistorialVoluntarioUseCase = new ObtenerHistorialVoluntarioUseCase(ofertaRepository);
const obtenerOfertasBySolicitudUseCase = new ObtenerOfertasBySolicitudUseCase(ofertaRepository);
const aceptarOfertaUseCase = new AceptarOfertaUseCase(ofertaRepository, crearNotificacionUseCase);
const rejectOfertaUseCase = new RechazarOfertaUseCase(ofertaRepository);

// Adaptador de entrada (Input Adapter)
const OfertaController = require('../adapters/input/oferta.controller');
const ofertaController = new OfertaController(
  crearOfertaUseCase,
  obtenerMisOfertasActivasUseCase,
  obtenerHistorialVoluntarioUseCase,
  obtenerOfertasBySolicitudUseCase,
  aceptarOfertaUseCase,
  rejectOfertaUseCase
);

module.exports = {
  ofertaController,
  ofertaRepository
};
