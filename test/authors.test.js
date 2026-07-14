const { beforeEach, describe, expect, it, vi } = require('vitest');
const request = require('supertest');

vi.mock('../src/services/authors_services', () => ({
  getAuthorsService: vi.fn(),
  getAuthorsByIdService: vi.fn(),
  postAuthorsService: vi.fn(),
  putAuthorsService: vi.fn(),
  deleteAuthorsService: vi.fn()
}));

const { server } = require('../src/server');
const { getAuthorsService, getAuthorsByIdService, postAuthorsService } = require('../src/services/authors_services');

describe('API de autores', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('devuelve un mensaje de bienvenida en la ruta raíz', async () => {
    const response = await request(server).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: 'Bienvenido a mi aplicación web',
      data: null
    });
  });

  it('devuelve un mensaje específico cuando no hay autores registrados', async () => {
    getAuthorsService.mockResolvedValue([]);

    const response = await request(server).get('/authors');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: 'No se encontro ningun autor',
      data: []
    });
  });

  it('obtiene la lista de autores desde el servicio', async () => {
    getAuthorsService.mockResolvedValue([
      { id: 1, name: 'Ana', email: 'ana@example.com', bio: 'Desarrolladora', created_at: '2024-01-01T00:00:00.000Z' }
    ]);

    const response = await request(server).get('/authors');

    expect(getAuthorsService).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: 'Autores obtenidos correctamente',
      data: [
        expect.objectContaining({ id: 1, name: 'Ana' })
      ]
    });
  });

  it('crea un autor correctamente cuando el servicio responde', async () => {
    postAuthorsService.mockResolvedValue({
      id: 2,
      name: 'Luis',
      email: 'luis@example.com',
      bio: 'Analista',
      created_at: '2024-01-02T00:00:00.000Z'
    });

    const response = await request(server)
      .post('/authors')
      .send({ name: 'Luis', email: 'luis@example.com', bio: 'Analista' });

    expect(postAuthorsService).toHaveBeenCalledWith({
      name: 'Luis',
      email: 'luis@example.com',
      bio: 'Analista'
    });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: 201,
      message: 'Autor creado correctamente',
      data: expect.objectContaining({ email: 'luis@example.com' })
    });
  });

  it('devuelve 409 cuando el servicio detecta un email duplicado', async () => {
    const error = new Error('este email ya se encuentra en el registro');
    error.statusCode = 409;
    postAuthorsService.mockRejectedValue(error);

    const response = await request(server)
      .post('/authors')
      .send({ name: 'Ana', email: 'ana@example.com', bio: 'Bio' });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      status: 409,
      message: 'este email ya se encuentra en el registro'
    });
  });

  it('devuelve 404 cuando el autor no existe', async () => {
    getAuthorsByIdService.mockResolvedValue(null);

    const response = await request(server).get('/authors/99');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ status: 404, message: 'Autor no encontrado' });
  });
});
