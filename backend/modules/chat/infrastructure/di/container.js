const dbPool = require('../../../../config/db');

// Adaptador de salida (Output Adapter)
const MySQLChatRepository = require('../adapters/output/mysql-chat.repository');

// Importar Caso de Uso de Notificaciones de forma cruzada
const { crearNotificacionUseCase } = require('../../../notificaciones/infrastructure/di/container');

// Casos de Uso (Use Cases)
const ObtenerConversacionesUseCase = require('../../application/use-cases/obtener-conversaciones.usecase');
const ObtenerMensajesUseCase = require('../../application/use-cases/obtener-mensajes.usecase');
const EnviarMensajeUseCase = require('../../application/use-cases/enviar-mensaje.usecase');

// Instanciación del repositorio
const chatRepository = new MySQLChatRepository(dbPool);

// Instanciación de Casos de Uso con Inyección de Dependencias cruzada
const obtenerConversacionesUseCase = new ObtenerConversacionesUseCase(chatRepository);
const obtenerMensajesUseCase = new ObtenerMensajesUseCase(chatRepository);
const enviarMensajeUseCase = new EnviarMensajeUseCase(chatRepository, crearNotificacionUseCase);

// Adaptador de entrada (Input Adapter)
const ChatController = require('../adapters/input/chat.controller');
const chatController = new ChatController(
  obtenerConversacionesUseCase,
  obtenerMensajesUseCase,
  enviarMensajeUseCase
);

module.exports = {
  chatController,
  chatRepository
};
