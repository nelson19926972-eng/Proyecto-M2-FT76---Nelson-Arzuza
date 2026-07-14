import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { pool } = require('../src/config/db_conect');
const { server } = require('../src/server');

const originalQuery = pool.query;

describe('API de posts', () => {
  beforeEach(() => {
    pool.query = vi.fn();
  });

  afterEach(() => {
    pool.query = originalQuery;
  });

  it('devuelve un mensaje específico cuando no hay posts registrados', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const response = await request(server).get('/posts');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: 'No se encontro ningun post',
      data: []
    });
  });

  it('obtiene la lista de posts', async () => {
    pool.query.mockResolvedValue({
      rows: [
        { id: 1, title: 'Hola', content: 'Contenido', author_id: 1, published: true, created_at: '2024-01-01T00:00:00.000Z' }
      ]
    });

    const response = await request(server).get('/posts');

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM posts');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: 'Posts obtenidos correctamente',
      data: [expect.objectContaining({ id: 1, title: 'Hola' })]
    });
  });

  it('obtiene un post por id', async () => {
    pool.query.mockResolvedValue({
      rows: [{ id: 2, title: 'Segundo', content: 'Texto', author_id: 1, published: false, created_at: '2024-01-02T00:00:00.000Z' }]
    });

    const response = await request(server).get('/posts/2');

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM posts WHERE id = $1', [2]);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: 'Post encontrado',
      data: expect.objectContaining({ id: 2, title: 'Segundo' })
    });
  });

  it('obtiene los posts de un autor', async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 5,
          title: 'Post del autor',
          content: 'Contenido',
          published: true,
          created_at: '2024-01-03T00:00:00.000Z',
          author_id_detail: 1,
          author_name: 'Ana',
          author_email: 'ana@example.com',
          author_bio: 'Bio',
          author_created_at: '2024-01-01T00:00:00.000Z'
        }
      ]
    });

    const response = await request(server).get('/posts/author/1');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: 'Posts del autor obtenidos correctamente',
      data: {
        author: expect.objectContaining({ id: 1, name: 'Ana' }),
        posts: [expect.objectContaining({ id: 5, title: 'Post del autor' })]
      }
    });
  });

  it('devuelve 404 con un mensaje claro cuando el autor del post no existe', async () => {
    pool.query.mockRejectedValueOnce({ code: '23503' });

    const response = await request(server)
      .post('/posts')
      .send({ title: 'Nuevo', content: 'Contenido', author_id: '999', published: true });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: 'El autor no se encuentra registrado'
    });
  });

  it('requiere el id del autor para crear un post', async () => {
    const response = await request(server)
      .post('/posts')
      .send({ title: 'Nuevo', content: 'Contenido' });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('author_id');
  });

  it('crea un post correctamente', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 3, title: 'Nuevo', content: 'Contenido', author_id: 7, published: true, created_at: '2024-01-04T00:00:00.000Z' }]
    });

    const response = await request(server)
      .post('/posts')
      .send({ title: 'Nuevo', content: 'Contenido', author_id: '7', published: true });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: 201,
      message: 'Post creado correctamente',
      data: expect.objectContaining({ title: 'Nuevo', author_id: 7 })
    });
  });

  it('actualiza un post existente', async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 3 }] })
      .mockResolvedValueOnce({ rows: [{ id: 3, title: 'Título actualizado', content: 'Contenido actualizado', author_id: 1, published: false, created_at: '2024-01-04T00:00:00.000Z' }] });

    const response = await request(server)
      .put('/posts/3')
      .send({ title: 'Título actualizado', content: 'Contenido actualizado', published: false });

    expect(pool.query).toHaveBeenLastCalledWith(
      'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *',
      ['Título actualizado', 'Contenido actualizado', false, 3]
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: 'Post actualizado correctamente',
      data: expect.objectContaining({ title: 'Título actualizado', content: 'Contenido actualizado', published: false })
    });
  });

  it('no permite cambiar el autor del post', async () => {
    const response = await request(server)
      .put('/posts/3')
      .send({ author_id: 2 });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Campos no permitidos');
  });

  it('elimina un post existente', async () => {
    pool.query.mockResolvedValue({ rowCount: 1 });

    const response = await request(server).delete('/posts/4');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: 'Post eliminado correctamente',
      data: null
    });
  });
});
