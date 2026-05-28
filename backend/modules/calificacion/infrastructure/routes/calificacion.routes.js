const express = require('express');
const router = express.Router();
const { calificacionController } = require('../di/container');
const { verifyToken } = require('../../../../middlewares/auth.middleware');

/**
 * @swagger
 * /api/calificaciones:
 *   post:
 *     summary: Register a new rating/review for an interaction
 *     tags: [Calificaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_solicitud
 *               - puntaje
 *             properties:
 *               id_solicitud:
 *                 type: integer
 *               puntaje:
 *                 type: integer
 *               comentario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rating registered successfully
 */
router.post('/', verifyToken, calificacionController.createCalificacion);

/**
 * @swagger
 * /api/calificaciones/me:
 *   get:
 *     summary: Get reviews made to the current user
 *     tags: [Calificaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of ratings
 */
router.get('/me', verifyToken, calificacionController.getMisCalificaciones);

/**
 * @swagger
 * /api/calificaciones/user/{id_usuario}:
 *   get:
 *     summary: Get reviews made to a specific user
 *     tags: [Calificaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of ratings
 */
router.get('/user/:id_usuario', verifyToken, calificacionController.getUserCalificaciones);

/**
 * @swagger
 * /api/calificaciones/check/{id_solicitud}:
 *   get:
 *     summary: Check if the logged-in user is eligible to rate this request
 *     tags: [Calificaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_solicitud
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eligibility status
 */
router.get('/check/:id_solicitud', verifyToken, calificacionController.checkRatingStatus);

module.exports = router;
