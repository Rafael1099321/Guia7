const servicio = require('../services/productoService');

const noEncontrado = (res) => res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });

// 1. POST /api/productos
exports.crearProducto = async (req, res, next) => {
  try { res.status(201).json({ ok: true, data: await servicio.crear(req.body) }); }
  catch (e) { next(e); }
};

// 2. GET /api/productos
exports.listarProductos = async (req, res, next) => {
  try {
    const data = await servicio.listar();
    res.json({ ok: true, total: data.length, data });
  } catch (e) { next(e); }
};

// 3. GET /api/productos/:id
exports.obtenerProducto = async (req, res, next) => {
  try {
    const p = await servicio.obtenerPorId(req.params.id);
    p ? res.json({ ok: true, data: p }) : noEncontrado(res);
  } catch (e) { next(e); }
};

// 4. PUT /api/productos/:id
exports.actualizarProducto = async (req, res, next) => {
  try {
    const p = await servicio.reemplazar(req.params.id, req.body);
    p ? res.json({ ok: true, data: p }) : noEncontrado(res);
  } catch (e) { next(e); }
};

// 5. DELETE /api/productos/:id
exports.eliminarProducto = async (req, res, next) => {
  try {
    const p = await servicio.eliminar(req.params.id);
    p ? res.json({ ok: true, mensaje: 'Producto eliminado', data: p }) : noEncontrado(res);
  } catch (e) { next(e); }
};

// 6. GET /api/productos/categoria/:cat
exports.productosPorCategoria = async (req, res, next) => {
  try {
    const data = await servicio.porCategoria(req.params.cat);
    res.json({ ok: true, total: data.length, data });
  } catch (e) { next(e); }
};
