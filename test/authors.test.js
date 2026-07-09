const test = require('node:test');
const assert = require('node:assert/strict');
const { pool } = require('../src/config/db_conect');
const { postAuthorsService } = require('../src/services/authors_services');

test('postAuthorsService devuelve un error claro para emails duplicados', async () => {
  const originalQuery = pool.query;

  pool.query = async (query, params) => {
    if (query.includes('SELECT id FROM authors')) {
      return { rows: [{ id: 1 }] };
    }

    return { rows: [{ id: 99, name: 'Ana', email: params[1], bio: params[2], created_at: params[3] }] };
  };

  try {
    await assert.rejects(
      () => postAuthorsService({ name: 'Ana', email: 'ana@example.com', bio: 'Bio' }),
      (error) => {
        assert.equal(error.message, 'este email ya se encuentra en el registro');
        assert.equal(error.statusCode, 409);
        return true;
      }
    );
  } finally {
    pool.query = originalQuery;
  }
});
