import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { pool } = require('../src/config/db_conect');
const { server } = require('../src/server');

const originalQuery = pool.query;

describe('API de comentarios', () => {
  beforeEach(() => {
    pool.query = vi.fn();
  });

  afterEach(() => {
    pool.query = originalQuery;
  });

  it('devuelve un mensaje específico cuando no hay comentarios registrados', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const response = await request(server).get('/comments');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: 'No se encontro ningun comentario',
      data: []
    });
  });

  it('obtiene la lista de comentarios', async () => {
    pool.query.mockResolvedValue({
      rows: [
        { id: 1, post_id: 1, author_id: 1, content: 'Buen post', created_at: '2024-01-01T00:00:00.000Z', author_name: 'Ana', author_email: 'ana@example.com', author_bio: 'Desarrolladora' }
      ]
    });

    const response = await request(server).get('/comments');

    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('SELECT c.*, a.name AS author_name'));
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: 'Comentarios obtenidos correctamente',
      data: [expect.objectContaining({ id: 1, content: 'Buen post' })]
    });
  });

  it('obtiene un comentario por id', async () => {
    pool.query.mockResolvedValue({
      rows: [{ id: 2, post_id: 1, author_id: 2, content: 'Gracias por compartir', created_at: '2024-01-02T00:00:00.000Z' }]
    });

    const response = await request(server).get('/comments/2');

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM comments WHERE id = $1', [2]);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: 'Comentario encontrado',
      data: expect.objectContaining({ id: 2, content: 'Gracias por compartir' })
    });
  });

  it('obtiene los comentarios de un post', async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 5,
          post_id: 3,
          author_id: 1,
          content: 'Muy útil',
          created_at: '2024-01-03T00:00:00.000Z',
          author_id_detail: 1,
          author_name: 'Ana',
          author_email: 'ana@example.com',
          author_bio: 'Desarrolladora',
          author_created_at: '2024-01-01T00:00:00.000Z'
        }
      ]
    });

    const response = await request(server).get('/comments/post/3');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: 'Comentarios del post obtenidos correctamente',
      data: [expect.objectContaining({ id: 5, post_id: 3 })]
    });
  });

  it('obtiene los comentarios de un autor', async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 7,
          post_id: 2,
          author_id: 3,
          content: 'Comentario del autor',
          created_at: '2024-01-05T00:00:00.000Z',
          post_title: 'Post de ejemplo',
          post_content: 'Contenido del post',
          post_published: true,
          post_created_at: '2024-01-02T00:00:00.000Z'
        }
      ]
    });

    const response = await request(server).get('/comments/author/3');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: 'Comentarios del autor obtenidos correctamente',
      data: [expect.objectContaining({ author_id: 3, post_id: 2 })]
    });
  });

  it('devuelve 404 cuando el autor del comentario no existe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const response = await request(server)
      .post('/comments')
      .send({ post_id: '1', author_id: '999', content: 'Comentario nuevo' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: 'El autor no se encuentra registrado'
    });
  });

  it('devuelve 404 cuando el post del comentario no existe', async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 1 }] })
      .mockResolvedValueOnce({ rows: [] });

    const response = await request(server)
      .post('/comments')
      .send({ post_id: '999', author_id: '1', content: 'Comentario nuevo' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: 'El post no se encuentra registrado'
    });
  });

  it('crea un comentario correctamente', async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 2 }] })
      .mockResolvedValueOnce({ rows: [{ id: 1 }] })
      .mockResolvedValueOnce({
        rows: [{ id: 3, post_id: 1, author_id: 2, content: 'Comentario nuevo', created_at: '2024-01-04T00:00:00.000Z' }]
      });

    const response = await request(server)
      .post('/comments')
      .send({ post_id: '1', author_id: '2', content: 'Comentario nuevo' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: 201,
      message: 'Comentario creado correctamente',
      data: expect.objectContaining({ post_id: 1, author_id: 2 })
    });
  });

  it('actualiza un comentario existente', async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 3 }] })
      .mockResolvedValueOnce({ rows: [{ id: 3, post_id: 1, author_id: 2, content: 'Actualizado', created_at: '2024-01-04T00:00:00.000Z' }] });

    const response = await request(server)
      .put('/comments/3')
      .send({ content: 'Actualizado' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 200,
      message: 'Comentario actualizado correctamente',
      data: expect.objectContaining({ content: 'Actualizado' })
    });
  });

  it('elimina un comentario existente', async () => {
    pool.query.mockResolvedValue({ rowCount: 1 });

    const response = await request(server).delete('/comments/4');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: 'Comentario eliminado correctamente',
      data: null
    });
  });
});
