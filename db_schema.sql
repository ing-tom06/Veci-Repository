-- Desactivar temporalmente la verificación de claves foráneas para evitar errores de orden de creación
SET FOREIGN_KEY_CHECKS = 0;

-- Drop existing tables if they exist to allow clean re-runs
DROP TABLE IF EXISTS `calificacion`;
DROP TABLE IF EXISTS `historial`;
DROP TABLE IF EXISTS `mensaje`;
DROP TABLE IF EXISTS `notificacion`;
DROP TABLE IF EXISTS `oferta`;
DROP TABLE IF EXISTS `perfil`;
DROP TABLE IF EXISTS `solicitud`;
DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `perfil` (
  `id_perfil` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `edad` int DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `documento_identidad` varchar(50) DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_perfil`),
  UNIQUE KEY `documento_identidad` (`documento_identidad`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `perfil_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `solicitud` (
  `id_solicitud` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `descripcion` text NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `fecha_servicio` datetime DEFAULT NULL,
  PRIMARY KEY (`id_solicitud`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `solicitud_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `calificacion` (
  `id_calificacion` int NOT NULL AUTO_INCREMENT,
  `id_solicitud` int NOT NULL,
  `id_calificador` int NOT NULL,
  `id_calificado` int NOT NULL,
  `puntaje` int NOT NULL,
  `comentario` text,
  PRIMARY KEY (`id_calificacion`),
  KEY `id_solicitud` (`id_solicitud`),
  KEY `id_calificador` (`id_calificador`),
  KEY `id_calificado` (`id_calificado`),
  CONSTRAINT `calificacion_ibfk_1` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`),
  CONSTRAINT `calificacion_ibfk_2` FOREIGN KEY (`id_calificador`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `calificacion_ibfk_3` FOREIGN KEY (`id_calificado`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `calificacion_chk_1` CHECK ((`puntaje` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `historial` (
  `id_historial` int NOT NULL AUTO_INCREMENT,
  `id_solicitud` int NOT NULL,
  `id_actor` int NOT NULL,
  `estado_solicitud` varchar(50) DEFAULT NULL,
  `fecha_cita` datetime DEFAULT NULL,
  PRIMARY KEY (`id_historial`),
  KEY `id_solicitud` (`id_solicitud`),
  KEY `id_actor` (`id_actor`),
  CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`),
  CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`id_actor`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mensaje` (
  `id_mensaje` int NOT NULL AUTO_INCREMENT,
  `id_solicitud` int NOT NULL,
  `id_emisor` int NOT NULL,
  `id_receptor` int NOT NULL,
  `contenido` text NOT NULL,
  `fecha_envio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_mensaje`),
  KEY `id_solicitud` (`id_solicitud`),
  KEY `id_emisor` (`id_emisor`),
  KEY `id_receptor` (`id_receptor`),
  CONSTRAINT `mensaje_ibfk_1` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`),
  CONSTRAINT `mensaje_ibfk_2` FOREIGN KEY (`id_emisor`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `mensaje_ibfk_3` FOREIGN KEY (`id_receptor`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `notificacion` (
  `id_notification` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `titulo` varchar(150) DEFAULT NULL,
  `mensaje` text,
  `leido` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_notification`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `oferta` (
  `id_oferta` int NOT NULL AUTO_INCREMENT,
  `id_solicitud` int NOT NULL,
  `id_voluntario` int NOT NULL,
  `estado_oferta` varchar(50) DEFAULT NULL,
  `fecha_oferta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_oferta`),
  KEY `id_solicitud` (`id_solicitud`),
  KEY `id_voluntario` (`id_voluntario`),
  CONSTRAINT `oferta_ibfk_1` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitud` (`id_solicitud`),
  CONSTRAINT `oferta_ibfk_2` FOREIGN KEY (`id_voluntario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Reactivar la verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;
