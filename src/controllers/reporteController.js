const servicio = require('../services/reporteService');

// 10. GET /api/reportes/estadisticas
exports.estadisticas = async (req, res, next) => {
  try { res.json({ ok: true, data: await servicio.estadisticas() }); }
  catch (e) { next(e); }
};
