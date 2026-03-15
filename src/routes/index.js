/* Componentes */
const test = require('./test.network');
const parqueoRoutes = require('./parqueo.routes');
const espacioRoutes = require('./espacio.routes');

const routes = (app) => {
  app.use('/test', test);
app.use('/api/parqueos', parqueoRoutes);
    app.use('/api/espacios', espacioRoutes);
};

module.exports = routes;
