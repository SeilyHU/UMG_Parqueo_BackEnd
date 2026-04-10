const EstudianteMultaStore = require("../store/estudiante_multa.store");

const regexCarne = /^\d{4}-\d{2}-\d+$/;
const estadoMap = {
  a: "A",
  activa: "A",
  p: "P",
  pendiente: "P",
  c: "C",
  cancelada: "C",
};

const normalizeEstado = (value) => {
  if (!value) return null;
  return estadoMap[String(value).trim().toLowerCase()] || null;
};

const formatDateTime = (value) => {
  if (!value) return value;
  const date = new Date(value);
  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const formatMulta = (record) => {
  if (!record) return record;
  const data = typeof record.toJSON === "function" ? record.toJSON() : { ...record };
  return {
    ...data,
    EMU_FECHA_CREACION: formatDateTime(data.EMU_FECHA_CREACION),
    EMU_FECHA_MODIFICACION: formatDateTime(data.EMU_FECHA_MODIFICACION),
  };
};

exports.getAllEstudianteMulta = async (req, res) => {
  try {
    const estudianteMulta = await EstudianteMultaStore.getAll();
    const result = Array.isArray(estudianteMulta)
      ? estudianteMulta.map(formatMulta)
      : formatMulta(estudianteMulta);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el registro de Estudiante y Multa",
      error: error.message,
    });
  }
};

exports.getEstudianteMultaByEstudianteCarne = async (req, res) => {
  try {
    const { EST_CARNE } = req.params;
    if (!regexCarne.test(EST_CARNE)) {
      return res.status(400).json({
        message: "Formato de carné inválido. Ej: 5190-23-202034",
      });
    }

    const estudianteMulta = await EstudianteMultaStore.getByEstudianteCarne(
      EST_CARNE,
    );

    const result = Array.isArray(estudianteMulta)
      ? estudianteMulta.map(formatMulta)
      : formatMulta(estudianteMulta);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el registro de Estudiante y Multa",
      error: error.message,
    });
  }
};

exports.createEstudianteMulta = async (req, res) => {
  try {
    const { MUL_MULTA, EST_CARNE } = req.body;

    if (!MUL_MULTA || !EST_CARNE) {
      return res.status(400).json({
        message:
          "Faltan campos obligatorios en el registro de Estudiante y Multa",
      });
    }

    if (!regexCarne.test(EST_CARNE)) {
      return res.status(400).json({
        message: "Formato de carné inválido. Ej: 5190-23-202034",
      });
    }

    const estudianteMulta = await EstudianteMultaStore.create({
      MUL_MULTA,
      EST_CARNE,
      EMU_CREADO_POR: "admin",
      EMU_ESTADO_MULTA: "A",
    });

    res.status(201).json(formatMulta(estudianteMulta));
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el registro de Estudiante y Multa",
      error: error.message,
    });
  }
};

exports.updateEstudianteMulta = async (req, res) => {
  try {
    const { EMU_ESTUDIANTE_MULTA } = req.params;
    const { EMU_ESTADO_MULTA, EMU_MODIFICADO_POR } = req.body;

    if (!EMU_ESTADO_MULTA || !EMU_MODIFICADO_POR) {
      return res.status(400).json({
        message: "EMU_ESTADO_MULTA y EMU_MODIFICADO_POR son requeridos",
      });
    }

    const estado = normalizeEstado(EMU_ESTADO_MULTA);
    if (!estado) {
      return res.status(400).json({
        message:
          "EMU_ESTADO_MULTA inválido. Solo se aceptan A / Activa, P / Pendiente o C / Cancelada.",
      });
    }

    const [affectedRows] = await EstudianteMultaStore.update(
      EMU_ESTUDIANTE_MULTA,
      {
        EMU_ESTADO_MULTA: estado,
        EMU_MODIFICADO_POR,
      },
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        message:
          "No se encontró el registro de Estudiante y Multa para actualizar",
      });
    }

    res.status(200).json({
      message: "Registro de Estudiante y Multa actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el registro de Estudiante y Multa",
      error: error.message,
    });
  }
};
