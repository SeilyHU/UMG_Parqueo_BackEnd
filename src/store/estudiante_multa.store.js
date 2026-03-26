const EstudianteMulta = require('../model/estudiante_multa.model');

class EstudianteMultaStore {
    
    static async getAll() {
        return await EstudianteMulta.findAll({
            order: [['MUL_id_multa', 'ASC'], ['EST_id_estudiante', 'ASC']]
        });
    }

    static async getById(multa_id, estudiante_id) {
        return await EstudianteMulta.findOne({
            where: { 
                MUL_id_multa: multa_id,
                EST_id_estudiante: estudiante_id
            }
        });
    }

    static async getByEstudianteId(estudiante_id) {
        return await EstudianteMulta.findAll({
            where: { EST_id_estudiante: estudiante_id }
        });
    }

    static async getByMultaId(multa_id) {
        return await EstudianteMulta.findAll({
            where: { MUL_id_multa: multa_id }
        });
    }

    static async create(data) {
        return await EstudianteMulta.create({
            MUL_id_multa: data.MUL_id_multa,
            EST_id_estudiante: data.EST_id_estudiante,
            EMU_estado_multa: data.EMU_estado_multa,
            EMU_creado_por: data.EMU_creado_por,
            EMU_fecha_creacion: data.EMU_fecha_creacion || new Date(),
            EMU_modificado_por: data.EMU_modificado_por || null,
            EMU_fecha_modificacion: data.EMU_fecha_modificacion || null,
            EMU_direccion_ip: data.EMU_direccion_ip || null
        });
    }

    static async update(multa_id, estudiante_id, data) {
        return await EstudianteMulta.update({
            EMU_estado_multa: data.EMU_estado_multa,
            EMU_modificado_por: data.EMU_modificado_por,
            EMU_fecha_modificacion: data.EMU_fecha_modificacion || new Date(),
            EMU_direccion_ip: data.EMU_direccion_ip
        }, {
            where: { 
                MUL_id_multa: multa_id,
                EST_id_estudiante: estudiante_id
            }
        });
    }

    static async delete(multa_id, estudiante_id) {
        return await EstudianteMulta.destroy({
            where: { 
                MUL_id_multa: multa_id,
                EST_id_estudiante: estudiante_id
            }
        });
    }
}

module.exports = EstudianteMultaStore;
