const swaggerUi = require('swagger-ui-express')

const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'API de Autores y Posts',
        version: '1.0.0',
        description: 'Documentación Swagger para la API de autores y posts.'
    },
    servers: [
        {
            url: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'http://localhost:3000'
        }
    ],
    tags: [
        {
            name: 'Bienvenida',
            description: 'Endpoint de bienvenida'
        },
        {
            name: 'Autores',
            description: 'Operaciones relacionadas con autores'
        },
        {
            name: 'Posts',
            description: 'Operaciones relacionadas con posts'
        }
    ],
    paths: {
        '/': {
            get: {
                tags: ['Bienvenida'],
                summary: 'Mensaje de bienvenida',
                responses: {
                    200: {
                        description: 'Mensaje de bienvenida recibido correctamente'
                    }
                }
            }
        },
        '/authors': {
            get: {
                tags: ['Autores'],
                summary: 'Listar autores',
                responses: {
                    200: {
                        description: 'Lista de autores obtenida correctamente'
                    }
                }
            },
            post: {
                tags: ['Autores'],
                summary: 'Crear autor',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    bio: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Autor creado correctamente'
                    },
                    409: {
                        description: 'El autor ya existe'
                    }
                }
            }
        },
        '/authors/{id}': {
            get: {
                tags: ['Autores'],
                summary: 'Obtener autor por ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' }
                    }
                ],
                responses: {
                    200: { description: 'Autor encontrado' },
                    404: { description: 'Autor no encontrado' }
                }
            },
            put: {
                tags: ['Autores'],
                summary: 'Actualizar autor',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    bio: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Autor actualizado correctamente' },
                    404: { description: 'Autor no encontrado' }
                }
            },
            delete: {
                tags: ['Autores'],
                summary: 'Eliminar autor',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' }
                    }
                ],
                responses: {
                    200: { description: 'Autor eliminado correctamente' },
                    404: { description: 'Autor no encontrado' }
                }
            }
        },
        '/posts': {
            get: {
                tags: ['Posts'],
                summary: 'Listar posts',
                responses: {
                    200: {
                        description: 'Lista de posts obtenida correctamente'
                    }
                }
            },
            post: {
                tags: ['Posts'],
                summary: 'Crear post',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    author_id: { type: 'integer' },
                                    title: { type: 'string' },
                                    content: { type: 'string' },
                                    published: { type: 'boolean' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Post creado correctamente'
                    },
                    409: {
                        description: 'El post ya existe'
                    }
                }
            }
        },
        '/posts/author/{authorId}': {
            get: {
                tags: ['Posts'],
                summary: 'Obtener posts por autor',
                parameters: [
                    {
                        name: 'authorId',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' }
                    }
                ],
                responses: {
                    200: { description: 'Posts del autor obtenidos correctamente' },
                    404: { description: 'No se encontraron posts para este autor' }
                }
            }
        },
        '/posts/{id}': {
            get: {
                tags: ['Posts'],
                summary: 'Obtener post por ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' }
                    }
                ],
                responses: {
                    200: { description: 'Post encontrado' },
                    404: { description: 'Post no encontrado' }
                }
            },
            put: {
                tags: ['Posts'],
                summary: 'Actualizar post',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    author_id: { type: 'integer' },
                                    title: { type: 'string' },
                                    content: { type: 'string' },
                                    published: { type: 'boolean' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Post actualizado correctamente' },
                    404: { description: 'Post no encontrado' }
                }
            },
            delete: {
                tags: ['Posts'],
                summary: 'Eliminar post',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' }
                    }
                ],
                responses: {
                    200: { description: 'Post eliminado correctamente' },
                    404: { description: 'Post no encontrado' }
                }
            }
        }
    }
}

module.exports = {
    swaggerUi,
    swaggerSpec
}
