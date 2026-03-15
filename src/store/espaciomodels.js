const oracledb = require('oracledb');

class EspacioModel {
    static async getAll() {
        const connection = await oracledb.getConnection();
        try {
            const result = await connection.execute(`SELECT * FROM DP_ESPACIO ORDER BY ES_Espacio ASC`);
            return result.rows;
        } finally {
            if (connection) { await connection.close(); }
        }
    }

    static async getByParqueoId(parqueoId) {
        const connection = await oracledb.getConnection();
        try {
            const result = await connection.execute(
                `SELECT * FROM DP_ESPACIO WHERE PQ_Parqueo = :parqueoId`,
                [parqueoId]
            );
            return result.rows;
        } finally {
            if (connection) { await connection.close(); }
        }
    }

    static async create(data) {
        const connection = await oracledb.getConnection();
        try {
            const result = await connection.execute(
                `INSERT INTO DP_ESPACIO (ES_Espacio, ES_Numero, ES_Estado, PQ_Parqueo) 
                 VALUES (:id, :numero, :estado, :parqueoId)`,
                {
                    id: data.ES_Espacio,
                    numero: data.ES_Numero,
                    estado: data.ES_Estado,
                    parqueoId: data.PQ_Parqueo
                }
            );
            return result.rowsAffected;
        } finally {
            if (connection) { await connection.close(); }
        }
    }

    static async update(id, data) {
        const connection = await oracledb.getConnection();
        try {
            const result = await connection.execute(
                `UPDATE DP_ESPACIO 
                 SET ES_Numero = :numero, ES_Estado = :estado, PQ_Parqueo = :parqueoId 
                 WHERE ES_Espacio = :id`,
                {
                    numero: data.ES_Numero,
                    estado: data.ES_Estado,
                    parqueoId: data.PQ_Parqueo,
                    id: id
                }
            );
            return result.rowsAffected;
        } finally {
            if (connection) { await connection.close(); }
        }
    }

    static async delete(id) {
        const connection = await oracledb.getConnection();
        try {
            const result = await connection.execute(
                `DELETE FROM DP_ESPACIO WHERE ES_Espacio = :id`,
                [id]
            );
            return result.rowsAffected;
        } finally {
            if (connection) { await connection.close(); }
        }
    }
}

module.exports = EspacioModel;