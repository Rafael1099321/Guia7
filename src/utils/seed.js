// Carga datos de prueba desde /data en MongoDB:  npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const conectarBD = require('./db');
const Producto = require('../models/Producto');

(async () => {
  await conectarBD();
  const datos = require(path.join(__dirname, '../../data/productos.json'));
  await Producto.deleteMany();
  await Producto.insertMany(datos);
  console.log(`✓ ${datos.length} productos cargados`);
  await mongoose.disconnect();
})();
