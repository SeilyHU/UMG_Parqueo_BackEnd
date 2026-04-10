const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Multa = sequelize.define(
  "Multa",
  {
    MUL_MULTA: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    MUL_MONTO_TOTAL: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    MUL_DESCRIPCION: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    MUL_FECHA: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    MUL_FECHA_VENCIMIENTO: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    MUL_CREADO_POR: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    MUL_FECHA_CREACION: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    MUL_MODIFICADO_POR: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    MUL_FECHA_MODIFICACION: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "PAR_MULTA",
    timestamps: false,
  },
);

module.exports = Multa;
