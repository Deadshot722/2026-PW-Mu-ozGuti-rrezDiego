// Mismas reglas que valida el backend (express-proyecto/validaciones.js).

export function validarBoleta(boleta) {
  return /^[0-9]{10}$/.test(String(boleta || '').trim());
}

export function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(correo || '').trim());
}
