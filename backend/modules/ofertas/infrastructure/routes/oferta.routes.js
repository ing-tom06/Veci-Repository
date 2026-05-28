const express = require('express');
const router = express.Router();
const { ofertaController } = require('../di/container');
const { verifyToken, isAdultoMayor, isVoluntario } = require('../../../../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Ofertas
 *   description: Ofertas API
 */

/**
 * @swagger
 * /api/ofertas:
 *   post:
 *     summary: Create a new offer (Voluntario)
 *     tags: [Ofertas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_solicitud:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Oferta created
 */
router.post('/', verifyToken, isVoluntario, ofertaController.createOferta);

/**
 * @swagger
 * /api/ofertas/mis-ofertas:
 *   get:
 *     summary: Get active offers for Voluntario
 *     tags: [Ofertas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active offers
 */
router.get('/mis-ofertas', verifyToken, isVoluntario, ofertaController.getMisOfertasActivas);

/**
 * @swagger
 * /api/ofertas/historial:
 *   get:
 *     summary: Get history of offers for Voluntario
 *     tags: [Ofertas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: History of offers
 */
router.get('/historial', verifyToken, isVoluntario, ofertaController.getHistorial);

/**
 * @swagger
 * /api/ofertas/solicitud/{id_solicitud}:
 *   get:
 *     summary: Get all offers for a specific request (Adulto Mayor)
 *     tags: [Ofertas]
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
 *         description: List of offers
 */
router.get('/solicitud/:id_solicitud', verifyToken, isAdultoMayor, ofertaController.getOfertasBySolicitud);

/**
 * @swagger
 * /api/ofertas/{id_oferta}/accept:
 *   put:
 *     summary: Accept a specific offer (Adulto Mayor)
 *     tags: [Ofertas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_oferta
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_solicitud:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Oferta accepted
 */
router.put('/:id_oferta/accept', verifyToken, isAdultoMayor, ofertaController.acceptOferta);

/**
 * @swagger
 * /api/ofertas/{id_oferta}/reject:
 *   put:
 *     summary: Reject a specific offer (Adulto Mayor)
 *     tags: [Ofertas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_oferta
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Oferta rejected
 */
router.put('/:id_oferta/reject', verifyToken, isAdultoMayor, ofertaController.rejectOferta);

module.exports = router;
