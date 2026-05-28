const dbPool = require('../../../../config/db');

// Adaptador de salida (Output Adapter)
const MySQLPerfilRepository = require('../adapters/output/mysql-perfil.repository');

// Casos de Uso (Use Cases)
const ObtenerPerfilUseCase = require('../../application/use-cases/obtener-perfil.usecase');
const ActualizarPerfilUseCase = require('../../application/use-cases/actualizar-perfil.usecase');

// Instanciación del repositorio
const perfilRepository = new MySQLPerfilRepository(dbPool);

// Instanciación de Casos de Uso
const obtenerPerfilUseCase = new ObtenerPerfilUseCase(perfilRepository);
const actualizarPerfilUseCase = new ActualizarPerfilUseCase(perfilRepository);

// Adaptador de entrada (Input Adapter)
const PerfilController = require('../adapters/input/perfil.controller');
const perfilController = new PerfilController(obtenerPerfilUseCase, actualizarPerfilUseCase);

module.exports = {
  perfilController,
  perfilRepository
};
