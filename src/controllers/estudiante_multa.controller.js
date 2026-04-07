const EstudianteMultaStore = require('../store/estudiante_multa.store');

exports.getAllEstudianteMulta = async (req, res) => {
    try {
        const estudianteMulta = await EstudianteMultaStore.getAll();
        res.status(200).json(estudianteMulta);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el registro de Estudiante y Multa',
            error: error.message
        });
    }
};

exports.getEstudianteMultaByEstudianteCarne = async (req, res) => {
    try {
        const { EST_CARNE_ESTUDIANTE } = req.params;
        const estudianteMulta = await EstudianteMultaStore.getByEstudianteCarne(EST_CARNE_ESTUDIANTE);
        
        res.status(200).json(estudianteMulta);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el registro de Estudiante y Multa',
            error: error.message
        });
    }
};

exports.createEstudianteMulta = async (req, res) => {
    try {
        const { EMU_ID_EST_MULTA, MUL_ID_MULTA, EST_CARNE_ESTUDIANTE, EST_ID_ESTUDIANTE, EMU_CREADO_POR } = req.body;
        
        if (!EMU_ID_EST_MULTA || !MUL_ID_MULTA || !EST_CARNE_ESTUDIANTE || !EST_ID_ESTUDIANTE || !EMU_CREADO_POR) {
            return res.status(400).json({
                message: 'Faltan campos obligatorios en el registro de Estudiante y Multa'
            });
        }

        // Asignar estado automáticamente como Activa
        req.body.EMU_ESTADO_MULTA = 'Activa';

        const estudianteMulta = await EstudianteMultaStore.create(req.body);
        res.status(201).json(estudianteMulta);
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el registro de Estudiante y Multa',
            error: error.message
        });
    }
};

exports.updateEstudianteMulta = async (req, res) => {
    try {
        const { EMU_ID_EST_MULTA } = req.params;
        const { EMU_ESTADO_MULTA, EMU_MODIFICADO_POR } = req.body;

        if (!EMU_ESTADO_MULTA || !EMU_MODIFICADO_POR) {
            return res.status(400).json({
                message: 'EMU_ESTADO_MULTA y EMU_MODIFICADO_POR son requeridos'
            });
        }

        const [affectedRows] = await EstudianteMultaStore.update(EMU_ID_EST_MULTA, {
            EMU_ESTADO_MULTA,
            EMU_MODIFICADO_POR
        });
        
        if (affectedRows === 0) {
            return res.status(404).json({ 
                message: 'No se encontró el registro de Estudiante y Multa para actualizar' 
            });
        }

        res.status(200).json({ 
            message: 'Registro de Estudiante y Multa actualizado correctamente' 
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el registro de Estudiante y Multa',
            error: error.message
        });
    }
};