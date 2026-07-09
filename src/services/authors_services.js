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

module.exports = {
  getAuthorsService,
  getAuthorsByIdService,
  postAuthorsService
};