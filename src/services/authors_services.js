const { pool } = require("../config/db_conect");

const getAuthorsService = async () => {
  const { rows } = await pool.query('SELECT * FROM authors');
  return rows;
};

const getAuthorsByIdService = async (id) => {
    const { rows } = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return rows[0];
};

const postAuthorsService = async (authorData) => {
    const { rows } = await pool.query(
        'INSERT INTO authors (name, email, bio, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
        [authorData.name, authorData.email, authorData.bio, authorData.created_at]
    );
    return rows[0];
};

const putAuthorsService = async (id, authorData) => {
    const fields = [];
    const values = [];

    if (authorData.name !== undefined) {
        fields.push('name = $' + (fields.length + 1));
        values.push(authorData.name);
    }

    if (authorData.email !== undefined) {
        fields.push('email = $' + (fields.length + 1));
        values.push(authorData.email);
    }

    if (authorData.bio !== undefined) {
        fields.push('bio = $' + (fields.length + 1));
        values.push(authorData.bio);
    }

    if (fields.length === 0) {
        return null;
    }

    values.push(id);
    const { rows } = await pool.query(
        `UPDATE authors SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
        values
    );
    return rows[0];
};

module.exports = {
  getAuthorsService,
  getAuthorsByIdService,
  postAuthorsService,
  putAuthorsService
};