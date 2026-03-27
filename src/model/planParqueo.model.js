
// IMPORTAR CONEXIÓN A LA BASE DE DATOS
const getConnection = require("../db");

// CLASE PLAN PARQUEO MODELO
class PlanParqueo {

// METODO: CREAR PLAN PARQUEO INSERT
    static async crear(data) {
        const connection = await getConnection();

        const result = await connection.execute(
            `INSERT INTO PLAN_PARQUEO
            (PLA_ID_PLAN, PLA_DESCRIPCION, PLA_PRECIO, PLA_ESTADO)
            VALUES (:id, :descripcion, :precio, :estado)`,
            {
                id: data.PLA_ID_PLAN,
                descripcion: data.PLA_DESCRIPCION,
                precio: data.PLA_PRECIO,
                estado: data.PLA_ESTADO
            },
            { autoCommit: true }
        );

        await connection.close();
        return result;
    }
      }