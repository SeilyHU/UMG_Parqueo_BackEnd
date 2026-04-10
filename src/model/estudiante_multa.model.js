const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const EstudianteMulta = sequelize.define(
  "EstudianteMulta",
  {
    EMU_ESTUDIANTE_MULTA: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    MUL_MULTA: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "PAR_MULTA",
        key: "MUL_MULTA",
      },
    },
    EST_CARNE: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: "PAR_ESTUDIANTE",
        key: "EST_CARNE",
      },
    },
    EMU_ESTADO_MULTA: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    EMU_CREADO_POR: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    EMU_FECHA_CREACION: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    EMU_MODIFICADO_POR: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    EMU_FECHA_MODIFICACION: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "PAR_ESTUDIANTE_MULTA",
    timestamps: false,
  },
);

module.exports = EstudianteMulta;
