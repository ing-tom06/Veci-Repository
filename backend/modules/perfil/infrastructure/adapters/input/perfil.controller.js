const cloudinary = require('../../../../../config/cloudinary');

class PerfilController {
  constructor(obtenerPerfilUseCase, actualizarPerfilUseCase) {
    this.obtenerPerfilUseCase = obtenerPerfilUseCase;
    this.actualizarPerfilUseCase = actualizarPerfilUseCase;
  }

  getPerfil = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const perfil = await this.obtenerPerfilUseCase.execute(idUsuario);
      if (!perfil) {
        return res.status(404).json({ message: 'Perfil no encontrado' });
      }
      res.json(perfil);
    } catch (error) {
      console.error('Error getPerfil:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  updatePerfil = async (req, res) => {
    try {
      const idUsuario = req.user.id;
      const { nombre, apellido, edad, telefono, documento_identidad } = req.body;

      if (!nombre || !apellido) {
        return res.status(400).json({ message: 'Nombre y apellido son requeridos' });
      }

      let foto_perfil = null;
      if (req.file) {
        const uploadPromise = new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'Veci_ProfilePhoto' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          stream.end(req.file.buffer);
        });
        foto_perfil = await uploadPromise;
      }

      await this.actualizarPerfilUseCase.execute(idUsuario, {
        nombre,
        apellido,
        edad,
        telefono,
        documento_identidad,
        foto_perfil
      });

      res.json({ message: 'Perfil actualizado con éxito', foto_perfil });
    } catch (error) {
      console.error('Error updatePerfil:', error);
      const status = error.message.includes('requeridos') ? 400 : 500;
      res.status(status).json({ message: error.message || 'Error al actualizar el perfil' });
    }
  }
}

module.exports = PerfilController;
