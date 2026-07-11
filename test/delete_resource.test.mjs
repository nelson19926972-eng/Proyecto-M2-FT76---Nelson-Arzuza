import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { pool } = require('../src/config/db_conect');
const { server } = require('../src/server');

const originalQuery = pool.query;

describe('Eliminar recursos existentes', () => {
  beforeEach(() => {
    pool.query = vi.fn();
  });

  afterEach(() => {
    pool.query = originalQuery;
  });

  it('elimina un autor existente', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });

    const response = await request(server).delete('/authors/5');

    expect(pool.query).toHaveBeenCalledWith('DELETE FROM authors WHERE id = $1', [5]);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 200, message: 'Autor eliminado correctamente', data: null });
  });

  it('elimina un post existente', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });

    const response = await request(server).delete('/posts/4');

    expect(pool.query).toHaveBeenCalledWith('DELETE FROM posts WHERE id = $1', [4]);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 200, message: 'Post eliminado correctamente', data: null });
  });
});
