# guia7-api – Guía 7 (Express + MongoDB / Mongoose)
SENA · ADSO 228118 · RAP 593108-04

## Ejecutar
1. Instalar Node.js y MongoDB Community (o usar MongoDB Atlas).
2. `npm install`
3. Copiar `.env.example` a `.env` (ya viene uno) y ajustar `MONGO_URI`.
4. (opcional) `npm run seed` carga datos de prueba desde `data/`
5. `npm start` → http://localhost:5000
6. Importar `Guia7.postman_collection.json` en Postman / Thunder Client y ejecutar en orden (el POST de producto guarda `productoId`).

## Endpoints (10)
| # | Método | Ruta | Descripción |
|---|--------|------|-------------|
| 1 | POST | /api/productos | Crear producto |
| 2 | GET | /api/productos | Listar |
| 3 | GET | /api/productos/:id | Detalle |
| 4 | PUT | /api/productos/:id | Actualización total |
| 5 | DELETE | /api/productos/:id | Eliminar |
| 6 | GET | /api/productos/categoria/:cat | Filtrar por categoría |
| 7 | POST | /api/usuarios/registro | Registro (bcrypt) |
| 8 | POST | /api/usuarios/login | Login (JWT) |
| 9 | GET | /api/usuarios | Listar usuarios (sin password) |
| 10 | GET | /api/reportes/estadisticas | Agregaciones ($group) |

## Estructura
```
guia7-api/
├── data/            datos de prueba (productos.json)
├── src/
│   ├── controllers/ reciben la petición HTTP y responden
│   ├── models/      esquemas Mongoose (Producto, Usuario)
│   ├── routes/      mapeo de endpoints
│   ├── services/    lógica de negocio y acceso a datos
│   ├── utils/       conexión a BD (db.js), manejo de errores, seed
│   └── app.js       punto de entrada
├── .gitignore
├── package.json
└── README.md
```
Flujo: Router → Controller → Service → Model (Mongoose) → MongoDB.

## Reflexión inicial (3.1)
**1. RAM/JSON local vs. motor de BD.** La RAM se pierde al reiniciar y un JSON en disco no maneja concurrencia (dos escrituras simultáneas se pisan), ni índices, ni validación, ni transacciones, y hay que leerlo entero. Un motor como MongoDB o MySQL da persistencia, acceso concurrente, índices para buscar rápido, control de acceso y respaldo.

**2. Python → Node.js + Express + JSON/BSON.** Node usa un event loop no bloqueante, adecuado para APIs con mucha E/S. Con MongoDB los documentos son casi JSON, así que casi no hay conversión entre la BD y la respuesta HTTP. Los esquemas flexibles permiten evolucionar el modelo sin migraciones rígidas, y un mismo lenguaje (JS) sirve para frontend y backend. Contrapartida: se pierden las relaciones/FK y las garantías ACID por defecto de SQL, así que Mongoose debe validar.

## Autoevaluación
1. B) mongoose · 2. A) Cargar variables desde .env a process.env · 3. B) Producto.findById(id)
