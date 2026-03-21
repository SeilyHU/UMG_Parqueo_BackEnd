const Parqueo = require('../model/parqueo.model');

class ParqueoStore {
    static async getAll() {
        return await Parqueo.findAll({
            order: [['PQ_Parqueo', 'ASC']]
        });
    }

    static async getById(id) {
        return await Parqueo.findByPk(id);
    }

    static async create(data) {
        return await Parqueo.create({
            PQ_Nombre: data.PQ_Nombre,
            PQ_Direccion: data.PQ_Direccion,
            PQ_Capacidad: data.PQ_Capacidad
        });
    }

    static async update(id, data) {
        return await Parqueo.update({
            PQ_Nombre: data.PQ_Nombre,
            PQ_Direccion: data.PQ_Direccion,
            PQ_Capacidad: data.PQ_Capacidad
        }, {
            where: { PQ_Parqueo: id }
        });
    }

    static async delete(id) {
        return await Parqueo.destroy({
            where: { PQ_Parqueo: id }
        });
    }
}

module.exports = ParqueoStore;