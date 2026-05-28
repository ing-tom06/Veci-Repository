const express = require('express');
const router = express.Router();
const { notificacionController } = require('../di/container');
const { verifyToken } = require('../../../../middlewares/auth.middleware');

/**
 * @swagger
 * /api/notificaciones:
 *   get:
 *     summary: Retrieve active notifications for the authenticated user
 *     tags: [Notificaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get('/', verifyToken, notificacionController.getNotifications);

/**
 * @swagger
 * /api/notificaciones/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notificaciones]
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
 *         description: Notification successfully updated
 */
router.put('/:id/read', verifyToken, notificacionController.markAsRead);

module.exports = router;
