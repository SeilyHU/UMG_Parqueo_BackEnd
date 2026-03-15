const ParqueoStore = require('../store/parqueo.store');

exports.getAllParqueos = async (req, res) => { 
    try {
        const parqueos = await ParqueoStore.getAll();
        res.status(200).json(parqueos);
    } catch (error) { 
        res.status(500).json({ message: 'Error al obtener los parqueos', error: error.message }); 
    }
};

exports.getParqueoById = async (req, res) => {
    try {
        const parqueo = await ParqueoStore.getById(req.params.id);
        if (!parqueo) {
            return res.status(404).json({ message: 'Parqueo no encontrado' });
        }
        res.status(200).json(parqueo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el parqueo', error: error.message });
    }
};

exports.createParqueo = async (req, res) => { 
    try {
        await ParqueoStore.create(req.body);
        res.status(201).json({ message: 'Parqueo creado exitosamente' });
    } catch (error) { 
        res.status(500).json({ message: 'Error al crear el parqueo', error: error.message }); 
    }
};

exports.updateParqueo = async (req, res) => { 
    try {
        const rowsAffected = await ParqueoStore.update(req.params.id, req.body);
        if (rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Parqueo no encontrado para actualizar' });
        }
        res.status(200).json({ message: 'Parqueo actualizado exitosamente' });
    } catch (error) { 
        res.status(500).json({ message: 'Error al actualizar el parqueo', error: error.message }); 
    }
};

exports.deleteParqueo = async (req, res) => { 
    try {
        const rowsDeleted = await ParqueoStore.delete(req.params.id);
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: 'Parqueo no encontrado para eliminar' });
        }
        res.status(200).json({ message: 'Parqueo eliminado exitosamente' });
    } catch (error) { 
        res.status(500).json({ message: 'Error al eliminar el parqueo', error: error.message }); 
    }
};