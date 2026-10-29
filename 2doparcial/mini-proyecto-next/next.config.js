/** @type {import('next').NextConfig} */

// Dirección del backend de Express (carpeta ../express-proyecto, puerto 3001 por defecto).
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';
// Mini-servidor de las semanas 6-7 (/saludo y /eco). Vive en el mismo Express, pero puedes
// apuntarlo a otro puerto con MINI_SERVIDOR_URL si lo tienes aparte.
const MINI_SERVIDOR_URL = process.env.MINI_SERVIDOR_URL || BACKEND_URL;

module.exports = {
  reactStrictMode: true,
  // Proxy: el navegador solo habla con Next (puerto 3000) y Next reenvía la petición al Express.
  // Así no hay problemas de CORS.
  async rewrites() {
    return [
      // /mini/saludo -> MINI_SERVIDOR_URL/saludo
      { source: '/mini/:path*', destination: `${MINI_SERVIDOR_URL}/:path*` },
      // /api/talleres -> BACKEND_URL/api/talleres
      { source: '/api/:path*', destination: `${BACKEND_URL}/api/:path*` },
    ];
  },
};
