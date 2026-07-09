import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { pool } = require('../src/config/db_conect');
const { server } = require('../src/server');

const originalQuery = pool.query;

describe('API de autores', () => {
  beforeEach(() => {
    pool.query = vi.fn();
  });

  afterEach(() => {
    pool.query = originalQuery;
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

  it('obtiene la lista de autores desde la base de datos', async () => {
    pool.query.mockResolvedValue({
      rows: [
        { id: 1, name: 'Ana', email: 'ana@example.com', bio: 'Desarrolladora', created_at: '2024-01-01T00:00:00.000Z' }
      ]
    });

    const response = await request(server).get('/authors');

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM authors');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: 'Autores obtenidos correctamente',
      data: [
        expect.objectContaining({ id: 1, name: 'Ana' })
      ]
    });
  });

  it('crea un autor correctamente cuando la base de datos responde', async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({
        rows: [{ id: 2, name: 'Luis', email: 'luis@example.com', bio: 'Analista', created_at: '2024-01-02T00:00:00.000Z' }]
      });

    const response = await request(server)
      .post('/authors')
      .send({ name: 'Luis', email: 'luis@example.com', bio: 'Analista' });

    expect(pool.query).toHaveBeenCalledTimes(2);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: 201,
      message: 'Autor creado correctamente',
      data: expect.objectContaining({ email: 'luis@example.com' })
    });
  });

  it('devuelve 409 cuando el email ya existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

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
    pool.query.mockResolvedValue({ rows: [] });

    const response = await request(server).get('/authors/99');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ status: 404, message: 'Autor no encontrado' });
  });
});
