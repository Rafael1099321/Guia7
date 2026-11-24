const router = require('express').Router();
const c = require('../controllers/productoController');
const { validarId } = require('../utils/errores');

router.post('/', c.crearProducto);
router.get('/', c.listarProductos);
router.get('/categoria/:cat', c.productosPorCategoria); // antes de /:id
router.get('/:id', validarId, c.obtenerProducto);
router.put('/:id', validarId, c.actualizarProducto);
router.delete('/:id', validarId, c.eliminarProducto);

module.exports = router;
