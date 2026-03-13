const oracledb = require('oracledb');

async function test() {
    let connection;
    try {
        // Ejemplo de cómo debe quedar tu conexión
        connection = await oracledb.getConnection({
            user: process.env.DB_USER || "SYSTEM",
            password: process.env.DB_PASSWORD || "1234",
            connectString: process.env.DB_CONNECTION_STRING || "localhost:1521/Estacionamientos_UMG"
        });

        console.log('✅ CONEXIÓN EXITOSA A ORACLE');
        const result = await connection.execute('SELECT banner FROM v$version');
        console.log('Versión:', result.rows[0][0]);

    } catch (err) {
        console.error('❌ ERROR:', err.message);
    } finally {
        if (connection) await connection.close();
    }
}
test();