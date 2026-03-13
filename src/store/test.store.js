const oracledb = require('oracledb');

// Configuramos los datos una sola vez aquí
const dbConfig = {
    user: process.env.DB_USER || "SYSTEM",
    password: process.env.DB_PASSWORD || "1234",
    connectString: process.env.DB_CONNECTION_STRING || "localhost:1521/Estacionamientos_UMG"
};

async function getConnection() {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        return connection;
    } catch (err) {
        console.error("❌ Error de conexión:", err.message);
        throw err;
    }
}

module.exports = { getConnection };