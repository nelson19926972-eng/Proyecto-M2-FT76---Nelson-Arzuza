const { describe, expect, it } = require('vitest');

const { validateAuthorBody } = require('../src/middlewares/bodyValidators');
const { validateIdParam } = require('../src/middlewares/params');

const createResponse = () => {
  const res = {
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
  };

  return res;
};

describe('middlewares de validación', () => {
  it('rechaza datos incompletos del autor', () => {
    const req = { body: { email: 'ana@example.com' } };
    const res = createResponse();

    validateAuthorBody(req, res, () => {
      throw new Error('next should not be called');
    });

    expect(res.statusCode).toBe(400);
    expect(res.payload.message).toBeTruthy();
    expect(res.payload.status).toBe(400);
  });

  it('acepta ids numéricos', () => {
    const req = { params: { id: '7' } };
    const res = createResponse();
    let called = false;

    validateIdParam('id')(req, res, () => {
      called = true;
    });

    expect(called).toBe(true);
    expect(res.statusCode).toBeNull();
    expect(req.params.id).toBe(7);
  });

  it('rechaza ids no numéricos', () => {
    const req = { params: { id: 'abc' } };
    const res = createResponse();

    validateIdParam('id')(req, res, () => {
      throw new Error('next should not be called');
    });

    expect(res.statusCode).toBe(400);
    expect(res.payload).toEqual({
      status: 400,
      message: 'El parámetro id debe ser un id numérico'
    });
  });
});
