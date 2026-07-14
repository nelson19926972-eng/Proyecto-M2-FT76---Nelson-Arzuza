import { describe, expect, it, vi } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { errorHandler } = require('../src/middlewares/errorHandler');

const createResponse = () => ({
  headersSent: false,
  statusCode: null,
  payload: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.payload = payload;
    return this;
  }
});

describe('errorHandler', () => {
  it('oculta los detalles de errores internos', () => {
    const res = createResponse();
    const error = new Error('detalle de base de datos');

    errorHandler(error, { method: 'GET', url: '/authors' }, res, vi.fn());

    expect(res.statusCode).toBe(500);
    expect(res.payload).toEqual({ status: 500, message: 'Error interno del servidor' });
  });

  it('responde 400 cuando el JSON es invÃ¡lido', () => {
    const res = createResponse();
    const error = new SyntaxError('Unexpected token');
    error.status = 400;
    error.body = '{';

    errorHandler(error, { method: 'POST', url: '/authors' }, res, vi.fn());

    expect(res.statusCode).toBe(400);
    expect(res.payload.status).toBe(400);
  });
});
