/* Componentes */
const test = require('./test.network');
const jornada = require('./jornada.network');
const asignacion = require('./asignacion.network');

const routes = (app) => {
  app.use('/test', test);
  app.use('/jornada', jornada);     // Nueva ruta para Jornadas
  app.use('/asignacion', asignacion); // Nueva ruta para Asignaciones
};

module.exports = routes;
