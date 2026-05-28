const express = require('express');
const router = express.Router();
const { solicitudController } = require('../di/container');
const { verifyToken, isAdultoMayor, isVoluntario } = require('../../../../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Solicitudes
 *   description: Solicitudes API
 */

/**
 * @swagger
 * /api/solicitudes:
 *   post:
 *     summary: Create a new solicitud (Adulto Mayor)
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoria:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               direccion:
 *                 type: string
 *               fecha_servicio:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Solicitud created
 */
router.post('/', verifyToken, isAdultoMayor, solicitudController.createSolicitud);

/**
 * @swagger
 * /api/solicitudes/mis-solicitudes:
 *   get:
 *     summary: Get active solicitudes for Adulto Mayor
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of solicitudes
 */
router.get('/mis-solicitudes', verifyToken, isAdultoMayor, solicitudController.getMisSolicitudes);

/**
 * @swagger
 * /api/solicitudes/historial:
 *   get:
 *     summary: Get history of solicitudes for Adulto Mayor
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: History of solicitudes
 */
router.get('/historial', verifyToken, isAdultoMayor, solicitudController.getHistorial);

/**
 * @swagger
 * /api/solicitudes/{id}/complete:
 *   put:
 *     summary: Mark a solicitud as completed (Adulto Mayor)
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Solicitud completed
 */
router.put('/:id/complete', verifyToken, isAdultoMayor, solicitudController.completeSolicitud);

/**
 * @swagger
 * /api/solicitudes/abiertas:
 *   get:
 *     summary: Get open solicitudes for Voluntarios
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of open solicitudes
 */
router.get('/abiertas', verifyToken, isVoluntario, solicitudController.getSolicitudesAbiertas);

module.exports = router;
