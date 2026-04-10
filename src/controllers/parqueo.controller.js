const ParqueoStore = require('../store/parqueo.store');
const ResponseHandler = require('../utils/responseHandler');

// VALIDADOR
function validateParqueo(data) {
    const errors = [];

    // 🔥 Nombre: letras + números + espacios (sin símbolos)
    if (!data.PQ_Nombre || !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/.test(data.PQ_Nombre)) {
        errors.push('El nombre solo debe contener letras, números y espacios (sin símbolos)');
    }

    // Dirección válida
    if (!data.PQ_Direccion || !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,#.-]+$/.test(data.PQ_Direccion)) {
        errors.push('La dirección contiene caracteres inválidos');
    }

    // Capacidad válida
    if (
        data.PQ_Capacidad === undefined ||
        !Number.isInteger(data.PQ_Capacidad) ||
        data.PQ_Capacidad <= 0
    ) {
        errors.push('La capacidad debe ser un número entero mayor a 0');
    }

    return errors;
}

// Obtener todos
exports.getAllParqueos = async (req, res) => { 
    try {
        const parqueos = await ParqueoStore.getAll();
        return ResponseHandler.success(res, parqueos, 'Parqueos obtenidos correctamente');
    } catch (error) { 
        return ResponseHandler.error(res, 'Error al obtener los parqueos', 500, error.message);
    }
};

// Obtener por ID
exports.getParqueoById = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return ResponseHandler.error(res, 'ID inválido', 400);
        }

        const parqueo = await ParqueoStore.getById(req.params.id);

        if (!parqueo) {
            return ResponseHandler.error(res, 'Parqueo no encontrado', 404);
        }

        return ResponseHandler.success(res, parqueo, 'Parqueo encontrado');
    } catch (error) {
        return ResponseHandler.error(res, 'Error al obtener el parqueo', 500, error.message);
    }
};

// Crear
exports.createParqueo = async (req, res) => { 
    try {
        // 🔹 LIMPIAR DATOS
        req.body.PQ_Nombre = req.body.PQ_Nombre?.trim();
        req.body.PQ_Direccion = req.body.PQ_Direccion?.trim();

        // 🔹 VALIDAR
        const errors = validateParqueo(req.body);
        if (errors.length > 0) {
            return ResponseHandler.error(res, 'Datos inválidos', 400, errors);
        }

        // 🔹 VALIDAR DUPLICADO
        const existente = await ParqueoStore.getAll();
        const repetido = existente.find(p => 
            p.PQ_Nombre.toLowerCase() === req.body.PQ_Nombre.toLowerCase()
        );

        if (repetido) {
            return ResponseHandler.error(
                res,
                'Operación rechazada: El parqueo ya existe',
                409
            );
        }

        const nuevo = await ParqueoStore.create(req.body);

        return ResponseHandler.success(res, nuevo, 'Parqueo creado exitosamente', 201);

    } catch (error) { 

        if (error.name === 'SequelizeValidationError') {
            const detalles = error.errors.map(e => e.message);
            return ResponseHandler.error(res, 'Error de validación', 400, detalles);
        }

        return ResponseHandler.error(res, 'Error al crear el parqueo', 500, error.message);
    }
};

// Actualizar
exports.updateParqueo = async (req, res) => { 
    try {
        if (isNaN(req.params.id)) {
            return ResponseHandler.error(res, 'ID inválido', 400);
        }

        // 🔹 LIMPIAR DATOS
        req.body.PQ_Nombre = req.body.PQ_Nombre?.trim();
        req.body.PQ_Direccion = req.body.PQ_Direccion?.trim();

        // 🔹 VALIDAR
        const errors = validateParqueo(req.body);
        if (errors.length > 0) {
            return ResponseHandler.error(res, 'Datos inválidos', 400, errors);
        }

        const rowsAffected = await ParqueoStore.update(req.params.id, req.body);

        if (rowsAffected[0] === 0) {
            return ResponseHandler.error(res, 'Parqueo no encontrado para actualizar', 404);
        }

        return ResponseHandler.success(res, null, 'Parqueo actualizado exitosamente');

    } catch (error) { 
        return ResponseHandler.error(res, 'Error al actualizar el parqueo', 500, error.message);
    }
};

// Eliminar
exports.deleteParqueo = async (req, res) => { 
    try {
        if (isNaN(req.params.id)) {
            return ResponseHandler.error(res, 'ID inválido', 400);
        }

        const rowsDeleted = await ParqueoStore.delete(req.params.id);

        if (rowsDeleted === 0) {
            return ResponseHandler.error(res, 'Parqueo no encontrado para eliminar', 404);
        }

        return ResponseHandler.success(res, null, 'Parqueo eliminado exitosamente');

    } catch (error) { 
        return ResponseHandler.error(res, 'Error al eliminar el parqueo', 500, error.message);
    }
};