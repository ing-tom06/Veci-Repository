const cloudinary = require('../../../../../config/cloudinary');

class AuthController {
  constructor(registrarUsuarioUseCase, loginUsuarioUseCase) {
    this.registrarUsuarioUseCase = registrarUsuarioUseCase;
    this.loginUsuarioUseCase = loginUsuarioUseCase;
  }

  register = async (req, res) => {
    try {
      let foto_perfil_url = null;
      
      // Decouple file uploading to the adapter layer
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
        foto_perfil_url = await uploadPromise;
      }

      const result = await this.registrarUsuarioUseCase.execute(req.body, foto_perfil_url);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error in register:', error);
      const status = error.status || 500;
      const message = error.message || 'Error interno del servidor.';
      res.status(status).json({ message });
    }
  }

  login = async (req, res) => {
    try {
      const { correo, contrasena } = req.body;
      console.log(`Intentando login para: ${correo}`);
      
      const result = await this.loginUsuarioUseCase.execute(correo, contrasena);
      console.log(`Login exitoso para: ${correo}`);
      res.json(result);
    } catch (error) {
      console.error('Error in login:', error);
      const status = error.status || 500;
      const message = error.message || 'Error interno del servidor.';
      res.status(status).json({ message });
    }
  }
}

module.exports = AuthController;
