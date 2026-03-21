const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Parqueo = require('./parqueo.model');

const Espacio = sequelize.define('Espacio', {
    ES_Espacio: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    ES_Numero: {
        type: DataTypes.INTEGER
    },
    ES_Estado: {
        type: DataTypes.INTEGER 
    },
    PQ_Parqueo: {
        type: DataTypes.BIGINT, 
        references: {
            model: Parqueo,
            key: 'PQ_Parqueo'
        }
    }
}, {
    tableName: 'DP_ESPACIO',
    timestamps: false
});

Parqueo.hasMany(Espacio, { foreignKey: 'PQ_Parqueo' });
Espacio.belongsTo(Parqueo, { foreignKey: 'PQ_Parqueo' });

module.exports = Espacio;