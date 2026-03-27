// Importar rutas de módulos
const estudianteRoutes = require('./estudiante.routes');
const multaRoutes = require('./multa.routes');
const estudianteMultaRoutes = require('./estudiante_multa.routes');

const routes = (app) => {

  app.use('/api/estudiantes', estudianteRoutes);
  app.use('/api/multa', multaRoutes);
  app.use('/api/estudiante_multa', estudianteMultaRoutes);

};

module.exports = routes;