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
    const createdAt = authorData?.created_at && authorData.created_at !== ''
        ? authorData.created_at
        : new Date().toISOString();

    const existingEmail = await pool.query('SELECT id FROM authors WHERE email = $1', [authorData.email]);
    if (existingEmail.rows.length > 0) {
        const error = new Error('este email ya se encuentra en el registro');
        error.statusCode = 409;
        throw error;
    }

    const { rows } = await pool.query(
        'INSERT INTO authors (name, email, bio, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
        [authorData.name, authorData.email, authorData.bio, createdAt]
    );
    return rows[0];
};

const putAuthorsService = async (id, authorData = {}) => {
    const authorId = Number(id ?? authorData?.id);

    if (!Number.isInteger(authorId)) {
        return null;
    }

    const existingAuthor = await pool.query('SELECT id FROM authors WHERE id = $1', [authorId]);
    if (existingAuthor.rows.length === 0) {
        return null;
    }

    const allowedFields = ['name', 'email', 'bio', 'created_at'];
    const fields = [];
    const values = [];

    Object.entries(authorData).forEach(([key, value]) => {
        if (key === 'id' || value === undefined || !allowedFields.includes(key)) {
            return;
        }

        fields.push(`${key} = $${fields.length + 1}`);
        values.push(value);
    });

    if (fields.length === 0) {
        return null;
    }

    values.push(authorId);
    const { rows } = await pool.query(
        `UPDATE authors SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
        values
    );
    return rows[0];
};

const deleteAuthorsService = async (id) => {
    const { rowCount } = await pool.query('DELETE FROM authors WHERE id = $1', [id]);
    return rowCount > 0;
};

module.exports = {
  getAuthorsService,
  getAuthorsByIdService,
  postAuthorsService,
  putAuthorsService,
  deleteAuthorsService
};