require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./modules/auth/infrastructure/routes/auth.routes');
const solicitudRoutes = require('./modules/solicitudes/infrastructure/routes/solicitud.routes');
const ofertaRoutes = require('./modules/ofertas/infrastructure/routes/oferta.routes');
const perfilRoutes = require('./modules/perfil/infrastructure/routes/perfil.routes');
const chatRoutes = require('./modules/chat/infrastructure/routes/chat.routes');
const calificacionRoutes = require('./modules/calificacion/infrastructure/routes/calificacion.routes');
const notificacionRoutes = require('./modules/notificaciones/infrastructure/routes/notificacion.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads (kept for backward compatibility if any old files remain)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/ofertas', ofertaRoutes);
app.use('/api/perfil', perfilRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/calificaciones', calificacionRoutes);
app.use('/api/notificaciones', notificacionRoutes);

// Swagger Documentation
const setupSwagger = require('./swagger');
setupSwagger(app);

// Error handler middleware (optional catch-all)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
