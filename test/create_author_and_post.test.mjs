import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { pool } = require('../src/config/db_conect');
const { server } = require('../src/server');

const originalQuery = pool.query;

describe('Crear autor y post encadenados', () => {
  beforeEach(() => {
    pool.query = vi.fn();
  });

  afterEach(() => {
    pool.query = originalQuery;
  });

  it('crea un autor y luego un post asociado a ese autor', async () => {
    // Mock: comprobación de email -> no existe
    pool.query
      .mockResolvedValueOnce({ rows: [] })
      // Mock: inserción del autor -> devuelve autor creado
      .mockResolvedValueOnce({ rows: [{ id: 10, name: 'Pedro', email: 'pedro@example.com', bio: 'Tester', created_at: '2024-01-05T00:00:00.000Z' }] })
      // Mock: inserción del post -> devuelve post creado
      .mockResolvedValueOnce({ rows: [{ id: 20, title: 'Post de Pedro', content: 'Contenido', author_id: 10, published: true, created_at: '2024-01-05T01:00:00.000Z' }] });

    // Crear autor
    const authorResp = await request(server)
      .post('/authors')
      .send({ name: 'Pedro', email: 'pedro@example.com', bio: 'Tester' });

    expect(authorResp.status).toBe(201);
    expect(authorResp.body).toMatchObject({
      status: 201,
      message: 'Autor creado correctamente',
      data: expect.objectContaining({ id: 10, email: 'pedro@example.com' })
    });

    // Crear post usando el id del autor creado
    const postResp = await request(server)
      .post('/posts')
      .send({ title: 'Post de Pedro', content: 'Contenido', author_id: String(authorResp.body.data.id) });

    expect(postResp.status).toBe(201);
    expect(postResp.body).toMatchObject({
      status: 201,
      message: 'Post creado correctamente',
      data: expect.objectContaining({ title: 'Post de Pedro', author_id: 10 })
    });

    // Verificar que las consultas al pool fueron realizadas (3 llamadas)
    expect(pool.query).toHaveBeenCalledTimes(3);
  });
});
