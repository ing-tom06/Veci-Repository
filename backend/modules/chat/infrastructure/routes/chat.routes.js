const express = require('express');
const router = express.Router();
const { chatController } = require('../di/container');
const { verifyToken } = require('../../../../middlewares/auth.middleware');

/**
 * @swagger
 * /api/chat/conversations:
 *   get:
 *     summary: Retrieve active conversations for the authenticated user
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active conversations
 */
router.get('/conversations', verifyToken, chatController.getConversations);

/**
 * @swagger
 * /api/chat/messages/{id_solicitud}:
 *   get:
 *     summary: Retrieve message history for a given request chat
 *     tags: [Chat]
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
 *         description: Message history
 */
router.get('/messages/:id_solicitud', verifyToken, chatController.getMessages);

/**
 * @swagger
 * /api/chat/messages:
 *   post:
 *     summary: Send a new chat message
 *     tags: [Chat]
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
 *               - contenido
 *             properties:
 *               id_solicitud:
 *                 type: integer
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 */
router.post('/messages', verifyToken, chatController.sendMessage);

module.exports = router;
