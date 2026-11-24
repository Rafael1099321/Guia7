const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

exports.estadisticas = async () => {
  const [totalUsuarios, general, porCategoria] = await Promise.all([
    Usuario.countDocuments(),
    Producto.aggregate([
      { $group: {
        _id: null,
        totalProductos: { $sum: 1 },
        stockTotal: { $sum: '$stock' },
        precioPromedio: { $avg: '$precio' },
        valorInventario: { $sum: { $multiply: ['$precio', '$stock'] } }
      } },
      { $project: { _id: 0 } }
    ]),
    Producto.aggregate([
      { $group: { _id: '$categoria', cantidad: { $sum: 1 }, stock: { $sum: '$stock' }, precioPromedio: { $avg: '$precio' } } },
      { $project: { _id: 0, categoria: '$_id', cantidad: 1, stock: 1, precioPromedio: { $round: ['$precioPromedio', 2] } } },
      { $sort: { cantidad: -1 } }
    ])
  ]);
  return {
    totalUsuarios,
    productos: general[0] || { totalProductos: 0, stockTotal: 0, precioPromedio: 0, valorInventario: 0 },
    porCategoria
  };
};
