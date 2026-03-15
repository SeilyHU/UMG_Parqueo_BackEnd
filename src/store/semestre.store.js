const Semestre = require('../model/semestre.model');

class SemestreStore {
    static async getAll() {
        return await Semestre.findAll({
            order: [['SM_Semestre', 'ASC']]
        });
    }

    static async getById(id) {
        return await Semestre.findByPk(id);
    }

    static async create(data) {
        return await Semestre.create({
            SM_Semestre: data.SM_Semestre,
            SM_ANO: data.SM_ANO,
            SM_Periodo: data.SM_Periodo
        });
    }

    static async update(id, data) {
        return await Semestre.update({
            SM_ANO: data.SM_ANO,
            SM_Periodo: data.SM_Periodo
        }, {
            where: { SM_Semestre: id }
        });
    }

    static async delete(id) {
        return await Semestre.destroy({
            where: { SM_Semestre: id }
        });
    }
}

module.exports = SemestreStore;