const Producto = require('../models/Producto');

const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

exports.crear = ({ nombre, precio, categoria, stock }) =>
  Producto.create({ nombre, precio, categoria, stock });

exports.listar = () => Producto.find().sort({ fechaCreacion: -1 });

exports.obtenerPorId = (id) => Producto.findById(id);

// Actualización total (PUT)
exports.reemplazar = (id, { nombre, precio, categoria, stock }) =>
  Producto.findOneAndReplace(
    { _id: id },
    { nombre, precio, categoria, stock: stock ?? 0 },
    { returnDocument: 'after', runValidators: true }
  );

exports.eliminar = (id) => Producto.findByIdAndDelete(id);

exports.porCategoria = (cat) =>
  Producto.find({ categoria: new RegExp(`^${escapar(cat)}$`, 'i') });
