const config = require('../../config');

module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Gestion Application API',
    description: 'Gestion Application API',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  host: config.url,
  basePath: config.pathApi,
  tags: [
    {
      name: 'Users',
      description: 'API for users in the system',
    },
    {
      name: 'Entity',
      description: 'API for entity in the system',
    },
  ],
  schemes: [
    'https',
    'http',
  ],
  servers: [
    {
      url: 'https://api_url_testing',
      description: 'Testing server',
    },
  ],
  consumes: [
    'application/json',
  ],
  produces: [
    'application/json',
  ],
  securitySchemes: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  paths: {
    '/login': {
      post: {
        tags: [
          'Users',
        ],
        description: 'Create new user in system',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User that we want to signin',
            schema: {
              properties: {
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
            },
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/login',
            },
          },
          201: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'string',
                },
              },
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
    },
    '/users': {
      post: {
        tags: [
          'Users',
        ],
        description: 'Create new user in system',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User that we want to create',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        produces: [
          'application/json',
        ],
        security: [
          {
            JWT: [],
          },
        ],
        responses: {
          200: {
            description: 'New user is created',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          400: {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/Errors',
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
    },
    '/users/{userId}': {
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          description: 'ID of user that we want to find',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Users',
        ],
        security: [
          {
            JWT: [],
          },
        ],
        summary: 'Get user with given ID',
        responses: {
          200: {
            description: 'User is found',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          404: {
            description: 'User not found',
            schema: {
              properties: {
                error: {
                  type: 'User not found',
                },
              },
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete user with given ID',
        tags: [
          'Users',
        ],
        security: [
          {
            JWT: [],
          },
        ],
        responses: {
          200: {
            description: 'User is deleted',
            schema: {
              properties: {
                success: {
                  type: 'string',
                },
                _id: {
                  type: 'string',
                },
              },
            },
          },
          404: {
            description: 'User not found',
            schema: {
              properties: {
                error: {
                  type: 'User not found',
                },
              },
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
      put: {
        summary: 'Update user with give ID',
        tags: [
          'Users',
        ],
        security: [
          {
            JWT: [],
          },
        ],
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User with new values of properties',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        responses: {
          200: {
            description: 'User is updated',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          404: {
            description: 'User not found',
            schema: {
              properties: {
                error: {
                  type: 'User not found',
                },
              },
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
    },
    '/entity': {
      get: {
        tags: [
          'Entity',
        ],
        summary: 'Get all compte in system',
        security: [
          {
            JWT: [],
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Entity',
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
      post: {
        tags: [
          'Entity',
        ],
        description: 'Create new compte in system',
        parameters: [
          {
            name: 'entity',
            in: 'body',
            description: 'Entitys that we want to signin',
            schema: {
              $ref: '#/definitions/Entity',
            },
          },
        ],
        security: [
          {
            JWT: [],
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Entitys',
            },
          },
          400: {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/Errors',
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
    },
    '/entity/{entityId}': {
      parameters: [
        {
          name: 'entityId',
          in: 'path',
          required: true,
          description: 'ID of Entity that we want to find',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Entity',
        ],
        security: [
          {
            JWT: [],
          },
        ],
        summary: 'Get Compte with given ID',
        responses: {
          200: {
            description: 'Entity is found',
            schema: {
              $ref: '#/definitions/Entity',
            },
          },
          404: {
            description: 'Entity not found',
            schema: {
              properties: {
                error: {
                  type: 'Entity not found',
                },
              },
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete Entity with given ID',
        tags: [
          'Entity',
        ],
        security: [
          {
            JWT: [],
          },
        ],
        responses: {
          200: {
            description: 'Entity is deleted',
            schema: {
              properties: {
                success: {
                  type: 'string',
                },
                _id: {
                  type: 'string',
                },
              },
            },
          },
          404: {
            description: 'Entity not found',
            schema: {
              properties: {
                error: {
                  type: 'Entity not found',
                },
              },
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
    },
    '/device': {
      get: {
        tags: [
          'Device',
        ],
        summary: 'Get all device in system',
        security: [
          {
            JWT: [],
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Device',
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
      post: {
        tags: [
          'Device',
        ],
        description: 'Create new Device in system',
        parameters: [
          {
            name: 'Device',
            in: 'body',
            description: 'DeviceS that we want to signin',
            schema: {
              $ref: '#/definitions/Device',
            },
          },
        ],
        security: [
          {
            JWT: [],
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Devices',
            },
          },
          400: {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/Errors',
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
    },
    '/device/send/pushall': {
      post: {
        tags: [
          'Device',
        ],
        description: 'Create new Device in system',
        security: [
          {
            JWT: [],
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Push',
            },
          },
          400: {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/Errors',
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
    },
    '/device/send/push': {
      post: {
        tags: [
          'Device',
        ],
        description: 'Create new Device in system',
        parameters: [
          {
            name: 'Device',
            in: 'body',
            description: 'Device token',
            properties: {
              registration_ids: {
                type: 'string',
              },
            },
          },
        ],
        security: [
          {
            JWT: [],
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Push',
            },
          },
          400: {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/Errors',
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
    },
    '/device/{deviceId}': {
      parameters: [
        {
          name: 'deviceId',
          in: 'path',
          required: true,
          description: 'ID of Device that we want to find',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Device',
        ],
        security: [
          {
            JWT: [],
          },
        ],
        summary: 'Get Compte with given ID',
        responses: {
          200: {
            description: 'Device is found',
            schema: {
              $ref: '#/definitions/Device',
            },
          },
          404: {
            description: 'Device not found',
            schema: {
              properties: {
                error: {
                  type: 'Device not found',
                },
              },
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete Device with given ID',
        tags: [
          'Device',
        ],
        security: [
          {
            JWT: [],
          },
        ],
        responses: {
          200: {
            description: 'Device is deleted',
            schema: {
              properties: {
                success: {
                  type: 'string',
                },
                _id: {
                  type: 'string',
                },
              },
            },
          },
          404: {
            description: 'Device not found',
            schema: {
              properties: {
                error: {
                  type: 'Device not found',
                },
              },
            },
          },
          401: {
            description: 'KO',
            schema: {
              properties: {
                error: {
                  type: 'Invalid token.',
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    Push: {
      properties: {
        multicast_id: {
          type: 'string',
        },
        success: {
          type: 'number',
        },
        failure: {
          type: 'number',
        },
        results: {
          type: 'array',
          $ref: '#/definitions/ResultsPush',
        },
      },
    },
    ResultsPush: {
      properties: {
        message_id: {
          type: 'string',
        },
      },
    },
    Device: {
      required: [
        'uuid',
        'deviseInfo',
        'token',
      ],
      properties: {
        uuid: {
          type: 'string',
        },
        deviseInfo: {
          type: 'string',
        },
        token: {
          type: 'string',
        },
      },
    },
    Entity: {
      required: [
        'attribut',
        'attribut1',
        'attribut2',
      ],
      properties: {
        attribut: {
          type: 'string',
        },
        attribut1: {
          type: 'string',
        },
        attribut2: {
          type: 'string',
        },
      },
    },
    Date: {
      properties: {
        min: {
          type: 'string',
        },
        max: {
          type: 'string',
        },
      },
    },
    login: {
      properties: {
        user: {
          type: 'object',
        },
        token: {
          type: 'string',
          uniqueItems: true,
        },
      },
    },
    User: {
      required: [
        'email',
        'password',
        'username',
        'role',
      ],
      properties: {
        email: {
          type: 'string',
          uniqueItems: true,
        },
        password: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
        role: {
          type: 'number',
        },
      },
    },
    Error: {
      properties: {
        value: {
          type: 'string',
        },
        msg: {
          type: 'string',
        },
        param: {
          type: 'string',
        },
        location: {
          type: 'string',
        },
      },
    },
    Errors: {
      type: 'array',
      $ref: '#/definitions/Error',
    },
    Users: {
      type: 'array',
      $ref: '#/definitions/User',
    },
    Entitys: {
      type: 'array',
      $ref: '#/definitions/Entity',
    },
    Devices: {
      type: 'array',
      $ref: '#/definitions/Device',
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
