const bcrypt = require('bcryptjs');
const usuariosModelo = require('../modelo/usuarios');
const { validarNombre, validarCorreo, validarBoleta, validarContrasena, validarRol } = require('../validaciones');

function esDuplicado(error) {
    return error.code === 'ER_DUP_ENTRY' || error.code === '23505';
}

function errorInterno(res, error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
}

async function obtenerUsuarios(req, res) {
    try {
        res.json(await usuariosModelo.listar());
    } catch (error) {
        errorInterno(res, error);
    }
}

async function obtenerUsuario(req, res) {
    try {
        const usuario = await usuariosModelo.obtenerPorId(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        errorInterno(res, error);
    }
}

async function crearUsuario(req, res) {
    try {
        const { nombre, correo, contrasena, rol } = req.body || {};
        const boleta = req.body && req.body.boleta !== undefined ? String(req.body.boleta).trim() : undefined;

        if (!nombre || !correo || !contrasena || !boleta) {
            return res.status(400).json({ error: 'nombre, correo, contrasena y boleta son obligatorios' });
        }
        if (!validarNombre(nombre)) {
            return res.status(400).json({ error: 'El nombre debe tener de 1 a 4 palabras y contener solo letras' });
        }
        if (!validarCorreo(correo)) {
            return res.status(400).json({ error: 'El correo no tiene un formato válido' });
        }
        if (!validarBoleta(boleta)) {
            return res.status(400).json({ error: 'La boleta debe tener 10 dígitos' });
        }
        if (!validarContrasena(contrasena)) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
        }
        if (rol !== undefined && !validarRol(rol)) {
            return res.status(400).json({ error: 'El rol debe ser alumno, docente o admin' });
        }

        // La contraseña se guarda cifrada (bcrypt); nunca en texto plano.
        const contrasenaHash = await bcrypt.hash(contrasena, 10);
        const nuevo = await usuariosModelo.crear({
            nombre: String(nombre).trim(),
            correo: correo.trim(),
            contrasenaHash,
            boleta,
            rol,
        });
        res.status(201).json(nuevo);
    } catch (error) {
        if (esDuplicado(error)) {
            return res.status(409).json({ error: 'Ya existe un usuario con ese correo o boleta' });
        }
        errorInterno(res, error);
    }
}

async function actualizarUsuario(req, res) {
    try {
        const { nombre, correo, rol } = req.body || {};

        if (nombre === undefined && correo === undefined && rol === undefined) {
            return res.status(400).json({ error: 'Envía al menos uno de: nombre, correo, rol' });
        }
        if (nombre !== undefined && !validarNombre(nombre)) {
            return res.status(400).json({ error: 'El nombre debe tener de 1 a 4 palabras y contener solo letras' });
        }
        if (correo !== undefined && !validarCorreo(correo)) {
            return res.status(400).json({ error: 'El correo no tiene un formato válido' });
        }
        if (rol !== undefined && !validarRol(rol)) {
            return res.status(400).json({ error: 'El rol debe ser alumno, docente o admin' });
        }

        const actualizado = await usuariosModelo.actualizar(req.params.id, {
            nombre: nombre === undefined ? undefined : nombre.trim(),
            correo: correo === undefined ? undefined : correo.trim(),
            rol,
        });
        if (!actualizado) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(actualizado);
    } catch (error) {
        if (esDuplicado(error)) {
            return res.status(409).json({ error: 'Ya existe un usuario con ese correo' });
        }
        errorInterno(res, error);
    }
}

async function eliminarUsuario(req, res) {
    try {
        const eliminado = await usuariosModelo.eliminar(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(204).send();
    } catch (error) {
        errorInterno(res, error);
    }
}

module.exports = { obtenerUsuarios, obtenerUsuario, crearUsuario, actualizarUsuario, eliminarUsuario };
