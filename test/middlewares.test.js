const test = require('node:test');
const assert = require('node:assert/strict');

const { validateAuthorBody } = require('../src/middlewares/post');
const { validateIdParam } = require('../src/middlewares/get');

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

test('validateAuthorBody rechaza datos incompletos', () => {
  const req = { body: { email: 'ana@example.com' } };
  const res = createResponse();

  validateAuthorBody(req, res, () => {
    throw new Error('next should not be called');
  });

  assert.equal(res.statusCode, 400);
  assert.ok(res.payload.message);
  assert.equal(res.payload.status, 400);
});

test('validateIdParam acepta ids numéricos', () => {
  const req = { params: { id: '7' } };
  const res = createResponse();
  let called = false;

  validateIdParam('id')(req, res, () => {
    called = true;
  });

  assert.equal(called, true);
  assert.equal(res.statusCode, null);
});
