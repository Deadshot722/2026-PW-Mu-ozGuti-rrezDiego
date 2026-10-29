// Funciones que validan nombre, correo, boleta y contraseña (se usan en el controlador de usuarios).

function validarNombre(nombre) {
    if (typeof nombre !== 'string') return false;
    return /^\p{L}+(?: +\p{L}+){0,3}$/u.test(nombre.trim());
}

function validarCorreo(correo) {
    if (typeof correo !== 'string') return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

// La boleta del IPN tiene exactamente 10 dígitos.
function validarBoleta(boleta) {
    if (typeof boleta !== 'string') return false;
    const regex = /^\d{10}$/;
    return regex.test(boleta);
}

function validarContrasena(contrasena) {
    if (typeof contrasena !== 'string') return false;
    return contrasena.length >= 8;
}

const ROLES = ['alumno', 'docente', 'admin'];

function validarRol(rol) {
    return ROLES.includes(rol);
}

module.exports = { validarNombre, validarCorreo, validarBoleta, validarContrasena, validarRol, ROLES };
