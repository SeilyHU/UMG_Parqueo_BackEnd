/* Importaciones de librerías internas */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const jsonErrorHandler = require('./middleware/middleware.ErrorHandler');
const errorGlobalHandler = require('./middleware/middleware.ErrorGlobalHandler');

const app = express();


app.use(morgan('dev')); 
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(jsonErrorHandler);
routes(app);
app.use(errorGlobalHandler);

module.exports = app;