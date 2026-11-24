const servicio = require('../services/usuarioService');

// 7. POST /api/usuarios/registro
exports.registrar = async (req, res, next) => {
  try { res.status(201).json({ ok: true, data: await servicio.registrar(req.body) }); }
  catch (e) { next(e); }
};

// 8. POST /api/usuarios/login
exports.login = async (req, res, next) => {
  try {
    const r = await servicio.autenticar(req.body);
    if (!r) return res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
    res.json({ ok: true, ...r });
  } catch (e) { next(e); }
};

// 9. GET /api/usuarios
exports.listarUsuarios = async (req, res, next) => {
  try {
    const data = await servicio.listar();
    res.json({ ok: true, total: data.length, data });
  } catch (e) { next(e); }
};
