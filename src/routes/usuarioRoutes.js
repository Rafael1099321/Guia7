const router = require('express').Router();
const c = require('../controllers/usuarioController');

router.post('/registro', c.registrar);
router.post('/login', c.login);
router.get('/', c.listarUsuarios);

module.exports = router;
