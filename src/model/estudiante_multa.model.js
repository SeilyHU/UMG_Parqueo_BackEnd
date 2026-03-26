const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const EstudianteMulta = sequelize.define('EstudianteMulta', {
    MUL_id_multa: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    EST_id_estudiante: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    },
    EMU_estado_multa: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    EMU_creado_por: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    EMU_fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false    
    },
    EMU_modificado_por: {
        type: DataTypes.STRING(50),  
        allowNull: true
    },
    EMU_fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: true
    },    
    EMU_direccion_ip: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'ESTUDIANTE_MULTA',
    timestamps: false
});

module.exports = EstudianteMulta;