const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Semestre = sequelize.define('Semestre', {
    SM_Semestre: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    SM_ANO: {
        type: DataTypes.INTEGER
    },
    SM_Periodo: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'DP_SEMESTRE',
    timestamps: false
});
module.exports = Semestre;