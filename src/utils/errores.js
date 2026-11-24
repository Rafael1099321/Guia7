const mongoose = require('mongoose');

// Valida que :id sea un ObjectId válido antes de llegar al controlador
const validarId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ ok: false, mensaje: 'ID no válido' });
  }
  next();
};

const noEncontrada = (req, res) =>
  res.status(404).json({ ok: false, mensaje: `Ruta ${req.method} ${req.originalUrl} no existe` });

// Manejador global de errores
const manejadorErrores = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ ok: false, mensaje: Object.values(err.errors).map(e => e.message) });
  }
  if (err.code === 11000) {
    return res.status(409).json({ ok: false, mensaje: 'Valor duplicado: ' + Object.keys(err.keyValue).join(', ') });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, mensaje: 'JSON mal formado' });
  }
  if (err.status) {
    return res.status(err.status).json({ ok: false, mensaje: err.message });
  }
  console.error(err);
  res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
};

module.exports = { validarId, noEncontrada, manejadorErrores };
