require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBD = require('./utils/db');
const { noEncontrada, manejadorErrores } = require('./utils/errores');

const app = express();

// 1. Conectar a la base de datos
if (require.main === module) conectarBD();

// 2. Middlewares globales
app.use(cors());
app.use(express.json());
// Express 5 deja req.body en undefined si la petición no trae cuerpo
app.use((req, res, next) => { req.body = req.body || {}; next(); });

// 3. Rutas de la API
app.get('/', (req, res) => res.json({ ok: true, mensaje: 'guia7-api - Express + MongoDB' }));
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/reportes', require('./routes/reporteRoutes'));

app.use(noEncontrada);
app.use(manejadorErrores);

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
}

module.exports = app;
