const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.registrar = async ({ nombre, email, password }) => {
  if (!password || password.length < 6) {
    const err = new Error('La contraseña debe tener al menos 6 caracteres');
    err.status = 400;
    throw err;
  }
  const hash = await bcrypt.hash(password, 10);
  const u = await Usuario.create({ nombre, email, password: hash });
  return { _id: u._id, nombre: u.nombre, email: u.email };
};

// Devuelve { token, usuario } o null si las credenciales son inválidas
exports.autenticar = async ({ email, password }) => {
  if (!email || !password) return null;
  const u = await Usuario.findOne({ email: String(email).toLowerCase() });
  if (!u || !(await bcrypt.compare(password, u.password))) return null;
  const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '2h' });
  return { token, usuario: { _id: u._id, nombre: u.nombre, email: u.email } };
};

exports.listar = () => Usuario.find().select('-password');
