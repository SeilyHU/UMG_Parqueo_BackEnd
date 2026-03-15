const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { 
        title: 'UMG Parqueos API', 
        version: '1.0.0', 
        description: 'Backend con IDs Automáticos y CRUD funcional' 
    },
    servers: [
      { url: 'http://localhost:4000', description: 'Servidor local' },
    ],
    components: {
      schemas: {
        Parqueo: {
          type: 'object',
          required: ['PQ_Parqueo', 'PQ_Nombre', 'PQ_Direccion', 'PQ_Capacidad'],
          properties: {
            PQ_Parqueo: { type: 'integer', description: 'ID del parqueo' },
            PQ_Nombre: { type: 'string', description: 'Nombre del parqueo' },
            PQ_Direccion: { type: 'string', description: 'Dirección física' },
            PQ_Capacidad: { type: 'integer', description: 'Capacidad máxima' },
          },
        },
        Espacio: {
          type: 'object',
          required: ['ES_Espacio', 'ES_Numero', 'ES_Estado', 'PQ_Parqueo'],
          properties: {
            ES_Espacio: { type: 'integer', description: 'ID único del espacio' },
            ES_Numero: { type: 'integer', description: 'Número asignado' },
            ES_Estado: { type: 'integer', description: 'Estado (1 Activo, 0 Inactivo)' },
            PQ_Parqueo: { type: 'integer', description: 'ID del parqueo' },
          },
        },
        Semestre: {
        type: 'object',
        required: ['SM_Semestre', 'SM_ANO', 'SM_Periodo'],
        properties: {
          SM_Semestre: { type: 'integer', description: 'ID único del semestre' },
          SM_ANO: { type: 'integer', description: 'Año del semestre (ej. 2026)' },
          SM_Periodo: { type: 'integer', description: 'Periodo (ej. 1 o 2)' }
        }
      },
      },
    },
    paths: {
      '/api/parqueos': {
        get: {
          tags: ['Parqueos'],
          summary: 'Obtiene todos los parqueos',
          responses: { '200': { description: 'Lista de parqueos' } }
        },
        post: {
          tags: ['Parqueos'],
          summary: 'Crea un parqueo',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Parqueo' } } }
          },
          responses: { '201': { description: 'Parqueo creado' } }
        }
      },
      '/api/parqueos/{id}': {
        get: {
          tags: ['Parqueos'],
          summary: 'Obtiene un parqueo por ID',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { '200': { description: 'Datos del parqueo' } }
        },
        put: {
          tags: ['Parqueos'],
          summary: 'Actualiza un parqueo',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Parqueo' } } }
          },
          responses: { '200': { description: 'Parqueo actualizado' } }
        },
        delete: {
          tags: ['Parqueos'],
          summary: 'Elimina un parqueo',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { '200': { description: 'Parqueo eliminado' } }
        }
      },
      '/api/espacios': {
        get: {
          tags: ['Espacios'],
          summary: 'Obtiene todos los espacios',
          responses: { '200': { description: 'Lista de espacios' } }
        },
        post: {
          tags: ['Espacios'],
          summary: 'Crea un espacio',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Espacio' } } }
          },
          responses: { '201': { description: 'Espacio creado' } }
        }
      },
      '/api/espacios/{id}': {
        put: {
          tags: ['Espacios'],
          summary: 'Actualiza un espacio',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Espacio' } } }
          },
          responses: { '200': { description: 'Espacio actualizado' } }
        },
        delete: {
          tags: ['Espacios'],
          summary: 'Elimina un espacio',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: { '200': { description: 'Espacio eliminado' } }
        }
      },
      '/api/espacios/parqueo/{parqueoId}': {
        get: {
          tags: ['Espacios'],
          summary: 'Filtra espacios por parqueo',
          parameters: [{ in: 'path', name: 'parqueoId', required: true, schema: { type: 'integer' } }],
          responses: { '200': { description: 'Lista de espacios' } }
        }
      },
      '/api/semestres': {
      get: {
        tags: ['Semestres'],
        summary: 'Obtiene todos los semestres',
        responses: { '200': { description: 'Lista de semestres' } }
      },
      post: {
        tags: ['Semestres'],
        summary: 'Crea un semestre',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Semestre' } } }
        },
        responses: { '201': { description: 'Semestre creado' } }
      }
    },
    '/api/semestres/{id}': {
      get: {
        tags: ['Semestres'],
        summary: 'Obtiene un semestre por ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Datos del semestre' } }
      },
      put: {
        tags: ['Semestres'],
        summary: 'Actualiza un semestre',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Semestre' } } }
        },
        responses: { '200': { description: 'Semestre actualizado' } }
      },
      delete: {
        tags: ['Semestres'],
        summary: 'Elimina un semestre',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Semestre eliminado' } }
      }
    }
      
    }
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
