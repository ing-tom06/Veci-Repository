const dbPool = require('../../../../config/db');

// Adaptador de salida (Output Adapter)
const MySQLAuthRepository = require('../adapters/output/mysql-auth.repository');

// Casos de Uso (Use Cases)
const RegistrarUsuarioUseCase = require('../../application/use-cases/registrar-usuario.usecase');
const LoginUsuarioUseCase = require('../../application/use-cases/login-usuario.usecase');

// Instanciación del repositorio
const authRepository = new MySQLAuthRepository(dbPool);

// Instanciación de Casos de Uso
const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(authRepository, dbPool);
const loginUsuarioUseCase = new LoginUsuarioUseCase(authRepository);

// Adaptador de entrada (Input Adapter)
const AuthController = require('../adapters/input/auth.controller');
const authController = new AuthController(registrarUsuarioUseCase, loginUsuarioUseCase);

module.exports = {
  authController,
  authRepository
};
