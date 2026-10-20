const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Livros e Autores',
      version: '1.0.0',
      description: 'Documentação da API RESTful com autenticação JWT e RBAC.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token no formato: Bearer <seu_token>',
        },
      },
      schemas: {
        UsuarioRegister: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            nome: { type: 'string', example: 'João da Silva' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            senha: { type: 'string', format: 'password', example: 'senha123' },
            role: { type: 'string', enum: ['USER', 'ADMIN'], example: 'USER' }
          }
        },
        UsuarioLogin: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            senha: { type: 'string', format: 'password', example: 'senha123' }
          }
        },
        Autor: {
          type: 'object',
          required: ['nome'],
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Machado de Assis' },
            biografia: { type: 'string', example: 'Escritor brasileiro.' }
          }
        },
        Livro: {
          type: 'object',
          required: ['titulo', 'isbn', 'autorId'],
          properties: {
            id: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Dom Casmurro' },
            isbn: { type: 'string', example: '978-85-359-0277-2' },
            autorId: { type: 'integer', example: 1 }
          }
        }
      }
    },
  },

  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;