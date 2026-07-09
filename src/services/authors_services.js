const { pool } = require("../config/db_conect");

const getAuthorsService = async () => {
  const { rows } = await pool.query('SELECT * FROM authors');
  return rows;
};

const getAuthorsByIdService = async (id) => {
    const { rows } = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return rows[0];
};


module.exports = {
  getAuthorsService,
  getAuthorsByIdService
};