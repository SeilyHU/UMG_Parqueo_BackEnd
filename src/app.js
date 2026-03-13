/* Importaciones de librerías internas */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

/* Importaciones de Swagger */
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // El archivo que ya tienes configurado

/* Funciones de app */
const app = express();

app.use(morgan('dev')); // <= logging de peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

/* Ruta de Documentación Swagger */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Rutas de la API */
routes(app);

module.exports = app;