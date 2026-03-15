const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Parqueo = sequelize.define('Parqueo', {
    PQ_Parqueo: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    PQ_Nombre: {
        type: DataTypes.STRING(100)
    },
    PQ_Direccion: {
        type: DataTypes.STRING(255)
    },
    PQ_Capacidad: {
        type: DataTypes.INTEGER 
    }
}, {
    tableName: 'DP_PARQUEO',
    timestamps: false 
});

module.exports = Parqueo;