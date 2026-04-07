const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UMG Sistema de Cobros API',
      version: '1.0.0',
      description: 'API REST para gestión de cobros a estudiantes'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor local' },
    ],

    components: {
      schemas: {

        Estudiante: {
          type: 'object',
          required: ['EST_ID_ESTUDIANTE', 'EST_CARNE', 'EST_NOMBRE_COMPLETO'],
          properties: {
            EST_ID_ESTUDIANTE: {
              type: 'integer',
              description: 'ID único del estudiante'
            },
            EST_CARNE: {
              type: 'string',
              description: 'Carné del estudiante (único)'
            },
            EST_NOMBRE_COMPLETO: {
              type: 'string',
              description: 'Nombre completo del estudiante'
            }
          },
          example: {
            EST_ID_ESTUDIANTE: 1001,
            EST_CARNE: 'UMG202401001',
            EST_NOMBRE_COMPLETO: 'Juan Pérez García'
          }
        },

        Multa: {
          type: 'object',
          required: ['MUL_id_multa', 'MUL_monto_total', 'MUL_monto_base', 'MUL_impuesto', 'MUL_descripcion', 'MUL_fecha', 'MUL_fecha_vencimiento', 'MUL_creado_por'],
          properties: {
            MUL_id_multa: {
              type: 'integer',
              format: 'int64',
              description: 'ID único de la multa'
            },
            MUL_monto_total: {
              type: 'number',
              format: 'decimal',
              description: 'Monto total de la multa'
            },
            MUL_monto_base: {
              type: 'number',
              format: 'decimal',
              description: 'Monto base de la multa'
            },
            MUL_impuesto: {
              type: 'number',
              format: 'decimal',
              description: 'Impuesto aplicado a la multa'
            },
            MUL_descripcion: {
              type: 'string',
              maxLength: 100,
              description: 'Descripción de la multa'
            },
            MUL_fecha: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de la multa'
            },
            MUL_fecha_vencimiento: {
              type: 'string',
              format: 'date',
              description: 'Fecha de vencimiento de la multa'
            },
            MUL_creado_por: {
              type: 'string',
              maxLength: 50,
              description: 'Usuario que creó la multa'
            },
            MUL_fecha_creacion: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación de la multa'
            },
            MUL_modificado_por: {
              type: 'string',
              maxLength: 50,
              description: 'Usuario que modificó la multa'
            },
            MUL_fecha_modificacion: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de modificación de la multa'
            }
          },
          example: {
            MUL_id_multa: 1,
            MUL_monto_total: 150.00,
            MUL_monto_base: 120.00,
            MUL_impuesto: 30.00,
            MUL_descripcion: 'Multa por estacionamiento indebido',
            MUL_fecha: '2023-10-01T10:00:00Z',
            MUL_fecha_vencimiento: '2023-10-15',
            MUL_creado_por: 'admin',
            MUL_fecha_creacion: '2023-10-01T10:00:00Z'
          }
        },

        EstudianteMulta: {
          type: 'object',
          required: ['EMU_ID_EST_MULTA', 'MUL_ID_MULTA', 'EST_CARNE_ESTUDIANTE', 'EST_ID_ESTUDIANTE', 'EMU_CREADO_POR'],
          properties: {
            EMU_ID_EST_MULTA: {
              type: 'integer',
              format: 'int64',
              description: 'ID único del registro de estudiante-multa'
            },
            MUL_ID_MULTA: {
              type: 'integer',
              format: 'int64',
              description: 'ID de la multa'
            },
            EST_CARNE_ESTUDIANTE: {
              type: 'integer',
              format: 'int64',
              description: 'Carné del estudiante'
            },
            EST_ID_ESTUDIANTE: {
              type: 'integer',
              description: 'ID del estudiante'
            },
            EMU_ESTADO_MULTA: {
              type: 'string',
              maxLength: 10,
              description: 'Estado de la multa para el estudiante (Ej: Activa, Anulada, Pagada)'
            },
            EMU_CREADO_POR: {
              type: 'string',
              maxLength: 50,
              description: 'Usuario que creó el registro de estudiante-multa'
            },
            EMU_FECHA_CREACION: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del registro'
            },
            EMU_MODIFICADO_POR: {
              type: 'string',
              maxLength: 50,
              description: 'Usuario que modificó el registro'
            },
            EMU_FECHA_MODIFICACION: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última modificación del registro'
            }
          },
          example: {
            EMU_ID_EST_MULTA: 10,
            MUL_ID_MULTA: 1,
            EST_CARNE_ESTUDIANTE: 51902321585,
            EST_ID_ESTUDIANTE: 1001,
            EMU_ESTADO_MULTA: "Activa",
            EMU_CREADO_POR: "Daniel",
            EMU_FECHA_CREACION: "2023-10-01T10:00:00Z",
            EMU_MODIFICADO_POR: "Luis",
            EMU_FECHA_MODIFICACION: "2023-10-05T15:30:00Z"
          }
        },
        FormaPago: {
          type: 'object',
          required: ['FPG_id_forma_pago', 'FPG_nombre_forma', 'FPG_estado'],
          properties: {
            FPG_id_forma_pago: {
              type: 'integer',
              description: 'ID único de la forma de pago'
            },
            FPG_nombre_forma: {
              type: 'string',
              maxLength: 50,
              description: 'Nombre de la forma de pago'
            },
            FPG_estado: {
              type: 'string',
              maxLength: 1,
              description: 'Estado de la forma de pago (A=Activo, I=Inactivo)'
            }
          },
          example: {
            FPG_id_forma_pago: 1,
            FPG_nombre_forma: 'Efectivo',
            FPG_estado: 'A'
          }
        }

      }
    },

    paths: {

      '/api/estudiantes': {
        get: {
          tags: ['Estudiantes'],
          summary: 'Obtiene todos los estudiantes',
          responses: {
            '200': {
              description: 'Lista de estudiantes obtenida correctamente',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Estudiante' }
                  }
                }
              }
            },
            '500': { description: 'Error al obtener los estudiantes' }
          }
        },
        post: {
          tags: ['Estudiantes'],
          summary: 'Crea un nuevo estudiante',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Estudiante' }
              }
            }
          },
          responses: {
            '201': { description: 'Estudiante creado exitosamente' },
            '400': { description: 'La carné del estudiante ya existe' },
            '500': { description: 'Error al crear el estudiante' }
          }
        }
      },

      '/api/estudiantes/{id}': {
        get: {
          tags: ['Estudiantes'],
          summary: 'Obtiene un estudiante por ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID del estudiante',
              schema: { type: 'integer' }
            }
          ],
          responses: {
            '200': {
              description: 'Estudiante obtenido correctamente',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Estudiante' }
                }
              }
            },
            '404': { description: 'Estudiante no encontrado' },
            '500': { description: 'Error al obtener el estudiante' }
          }
        },
        put: {
          tags: ['Estudiantes'],
          summary: 'Actualiza un estudiante',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID del estudiante',
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Estudiante' }
              }
            }
          },
          responses: {
            '200': { description: 'Estudiante actualizado exitosamente' },
            '400': { description: 'La carné del estudiante ya existe' },
            '404': { description: 'Estudiante no encontrado para actualizar' },
            '500': { description: 'Error al actualizar el estudiante' }
          }
        },
        delete: {
          tags: ['Estudiantes'],
          summary: 'Elimina un estudiante',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID del estudiante',
              schema: { type: 'integer' }
            }
          ],
          responses: {
            '200': { description: 'Estudiante eliminado exitosamente' },
            '404': { description: 'Estudiante no encontrado para eliminar' },
            '500': { description: 'Error al eliminar el estudiante' }
          }
        }
      },

      '/api/estudiantes/carne/{carne}': {
        get: {
          tags: ['Estudiantes'],
          summary: 'Obtiene un estudiante por carné',
          parameters: [
            {
              name: 'carne',
              in: 'path',
              required: true,
              description: 'Carné del estudiante',
              schema: { type: 'string' }
            }
          ],
          responses: {
            '200': {
              description: 'Estudiante obtenido correctamente',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Estudiante' }
                }
              }
            },
            '404': { description: 'Estudiante no encontrado por carné' },
            '500': { description: 'Error al buscar el estudiante' }
          }
        }
      },
      '/api/multa': {
        get: {
          tags: ['Multas'],
          summary: 'Obtiene todas las multas',
          responses: {
            '200': {
              description: 'Lista de multas obtenida correctamente',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Multa' }
                  }
                }
              }
            },
            '500': { description: 'Error al obtener las multas' }
          }
        },
        post: {
          tags: ['Multas'],
          summary: 'Crea una nueva multa',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Multa' }
              }
            }
          },
          responses: {
            '201': { description: 'Multa creada exitosamente' },
            '400': { description: 'El ID de la multa ya existe' },
            '500': { description: 'Error al crear la multa' }
          }
        }
      },

      '/api/multa/{id}': {
        get: {
          tags: ['Multas'],
          summary: 'Obtiene una multa por ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID de la multa',
              schema: { type: 'integer', format: 'int64' }
            }
          ],
          responses: {
            '200': {
              description: 'Multa obtenida correctamente',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Multa' }
                }
              }
            },
            '404': { description: 'Multa no encontrada' },
            '500': { description: 'Error al obtener la multa' }
          }
        },
        put: {
          tags: ['Multas'],
          summary: 'Actualiza una multa',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID de la multa',
              schema: { type: 'integer', format: 'int64' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Multa' }
              }
            }
          },
          responses: {
            '200': { description: 'Multa actualizada exitosamente' },
            '404': { description: 'Multa no encontrada para actualizar' },
            '500': { description: 'Error al actualizar la multa' }
          }
        },
      },

      '/api/forma_pago': {
        get: {
          tags: ['Formas de Pago'],
          summary: 'Obtiene todas las formas de pago',
          responses: {
            '200': {
              description: 'Lista de formas de pago obtenida correctamente',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/FormaPago' }
                  }
                }
              }
            },
            '500': { description: 'Error al obtener las formas de pago' }
          }
        },
        post: {
          tags: ['Formas de Pago'],
          summary: 'Crea una nueva forma de pago',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/FormaPago' }
              }
            }
          },
          responses: {
            '201': { description: 'Forma de pago creada exitosamente' },
            '400': { description: 'El ID de forma de pago ya existe' },
            '500': { description: 'Error al crear la forma de pago' }
          }
        }
      },

      '/api/forma_pago/{id}': {
        get: {
          tags: ['Formas de Pago'],
          summary: 'Obtiene una forma de pago por ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID de la forma de pago',
              schema: { type: 'integer' }
            }
          ],
          responses: {
            '200': {
              description: 'Forma de pago obtenida correctamente',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/FormaPago' }
                }
              }
            },
            '404': { description: 'Forma de pago no encontrada' },
            '500': { description: 'Error al obtener la forma de pago' }
          }
        },
        put: {
          tags: ['Formas de Pago'],
          summary: 'Actualiza una forma de pago',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID de la forma de pago',
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/FormaPago' }
              }
            }
          },
          responses: {
            '200': { description: 'Forma de pago actualizada exitosamente' },
            '404': { description: 'Forma de pago no encontrada para actualizar' },
            '500': { description: 'Error al actualizar la forma de pago' }
          }
        }
      },

      '/api/estudiante_multa': {
        get: {
          tags: ['Estudiante-Multa'],
          summary: 'Obtiene todas las relaciones estudiante-multa',
          responses: {
            '200': {
              description: 'Lista de relaciones estudiante-multa obtenida correctamente',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/EstudianteMulta' }
                  }
                }
              }
            },
            '500': { description: 'Error al obtener los registros' }
          }
        },
        post: {
          tags: ['Estudiante-Multa'],
          summary: 'Crea una nueva relación estudiante-multa',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['EMU_ID_EST_MULTA', 'MUL_ID_MULTA', 'EST_CARNE_ESTUDIANTE', 'EST_ID_ESTUDIANTE', 'EMU_CREADO_POR'],
                  properties: {
                    EMU_ID_EST_MULTA: { type: 'integer', format: 'int64' },
                    MUL_ID_MULTA: { type: 'integer', format: 'int64' },
                    EST_CARNE_ESTUDIANTE: { type: 'integer', format: 'int64' },
                    EST_ID_ESTUDIANTE: { type: 'integer' },
                    EMU_CREADO_POR: { type: 'string', maxLength: 50 }
                  },
                  example: {
                    EMU_ID_EST_MULTA: 10,
                    MUL_ID_MULTA: 1,
                    EST_CARNE_ESTUDIANTE: 51902321585,
                    EST_ID_ESTUDIANTE: 1001,
                    EMU_CREADO_POR: "Daniel"
                  }
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'Relación estudiante-multa creada exitosamente. EMU_FECHA_CREACION se asigna automáticamente. El estado se asigna automáticamente como Activa',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/EstudianteMulta' }
                }
              }
            },
            '400': { description: 'Faltan campos obligatorios' },
            '500': { description: 'Error al crear el registro' }
          }
        }
      },

      '/api/estudiante_multa/carne/{EST_CARNE_ESTUDIANTE}': {
        get: {
          tags: ['Estudiante-Multa'],
          summary: 'Obtiene todas las multas de un estudiante por carné',
          parameters: [
            {
              name: 'EST_CARNE_ESTUDIANTE',
              in: 'path',
              required: true,
              description: 'Carné del estudiante',
              schema: { type: 'string' }
            }
          ],
          responses: {
            '200': {
              description: 'Lista de multas del estudiante obtenida correctamente',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/EstudianteMulta' }
                  }
                }
              }
            },
            '500': { description: 'Error al obtener por carné' }
          }
        }
      },

      '/api/estudiante_multa/{EMU_ID_EST_MULTA}': {
        put: {
          tags: ['Estudiante-Multa'],
          summary: 'Actualiza el estado de la multa por ID',
          parameters: [
            {
              name: 'EMU_ID_EST_MULTA',
              in: 'path',
              required: true,
              description: 'ID del registro de estudiante-multa',
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['EMU_ESTADO_MULTA', 'EMU_MODIFICADO_POR'],
                  properties: {
                    EMU_ESTADO_MULTA: { type: 'string', maxLength: 10 },
                    EMU_MODIFICADO_POR: { type: 'string', maxLength: 50 }
                  },
                  example: {
                    EMU_ESTADO_MULTA: "Cancelada",
                    EMU_MODIFICADO_POR: "Luis"
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Registro actualizado correctamente. La fecha de modificación se actualiza automáticamente' },
            '404': { description: 'Registro no encontrado' },
            '400': { description: 'Solicitud inválida o faltan campos' },
            '500': { description: 'Error al actualizar el registro' }
          }
        }
      }

    },

  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;