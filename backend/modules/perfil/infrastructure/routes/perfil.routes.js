const express = require('express');
const router = express.Router();
const { perfilController } = require('../di/container');
const { verifyToken } = require('../../../../middlewares/auth.middleware');
const upload = require('../../../../middlewares/upload.middleware');

/**
 * @swagger
 * tags:
 *   name: Perfil
 *   description: Perfil API
 */

/**
 * @swagger
 * /api/perfil:
 *   get:
 *     summary: Get current user profile
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile object
 */
router.get('/', verifyToken, perfilController.getPerfil);

/**
 * @swagger
 * /api/perfil:
 *   put:
 *     summary: Update current user profile
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               telefono:
 *                 type: string
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put('/', verifyToken, upload.single('foto_perfil'), perfilController.updatePerfil);

module.exports = router;
