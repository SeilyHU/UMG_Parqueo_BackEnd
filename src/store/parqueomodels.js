const oracledb = require('oracledb');

class ParqueoModel {
    static async getAll() {
        const connection = await oracledb.getConnection();
        try {
            const result = await connection.execute(`SELECT * FROM DP_PARQUEO ORDER BY PQ_Parqueo ASC`);
            return result.rows;
        } finally {
            if (connection) { await connection.close(); }
        }
    }

    static async getById(id) {
        const connection = await oracledb.getConnection();
        try {
            const result = await connection.execute(
                `SELECT * FROM DP_PARQUEO WHERE PQ_Parqueo = :id`,
                [id]
            );
            return result.rows[0];
        } finally {
            if (connection) { await connection.close(); }
        }
    }

    static async create(data) {
        const connection = await oracledb.getConnection();
        try {
            const result = await connection.execute(
                `INSERT INTO DP_PARQUEO (PQ_Parqueo, PQ_Nombre, PQ_Direccion, PQ_Capacidad) 
                 VALUES (:id, :nombre, :direccion, :capacidad)`,
                {
                    id: data.PQ_Parqueo,
                    nombre: data.PQ_Nombre,
                    direccion: data.PQ_Direccion,
                    capacidad: data.PQ_Capacidad
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
                `UPDATE DP_PARQUEO 
                 SET PQ_Nombre = :nombre, PQ_Direccion = :direccion, PQ_Capacidad = :capacidad 
                 WHERE PQ_Parqueo = :id`,
                {
                    nombre: data.PQ_Nombre,
                    direccion: data.PQ_Direccion,
                    capacidad: data.PQ_Capacidad,
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
                `DELETE FROM DP_PARQUEO WHERE PQ_Parqueo = :id`,
                [id]
            );
            return result.rowsAffected;
        } finally {
            if (connection) { await connection.close(); }
        }
    }
}

module.exports = ParqueoModel;