const { pool } = require('../config/db_conect');

const getCommentsService = async () => {
  const { rows } = await pool.query(
    `SELECT c.*, a.name AS author_name, a.email AS author_email, a.bio AS author_bio
     FROM comments c
     INNER JOIN authors a ON c.author_id = a.id
     ORDER BY c.created_at DESC`
  );
  return rows;
};

const getCommentByIdService = async (id) => {
  const { rows } = await pool.query('SELECT * FROM comments WHERE id = $1', [id]);
  return rows[0];
};

const getCommentsByPostService = async (postId) => {
  const { rows } = await pool.query(
    `SELECT c.*, a.id AS author_id_detail, a.name AS author_name, a.email AS author_email, a.bio AS author_bio, a.created_at AS author_created_at
     FROM comments c
     INNER JOIN authors a ON c.author_id = a.id
     WHERE c.post_id = $1
     ORDER BY c.created_at DESC`,
    [postId]
  );
  return rows;
};

const getCommentsByAuthorService = async (authorId) => {
  const { rows } = await pool.query(
    `SELECT c.*, p.title AS post_title, p.content AS post_content, p.published AS post_published, p.created_at AS post_created_at
     FROM comments c
     INNER JOIN posts p ON c.post_id = p.id
     WHERE c.author_id = $1
     ORDER BY c.created_at DESC`,
    [authorId]
  );
  return rows;
};

const postCommentService = async (commentData) => {
  const createdAt = commentData?.created_at && commentData.created_at !== ''
    ? commentData.created_at
    : new Date().toISOString();

  const authorId = Number(commentData.author_id);
  const postId = Number(commentData.post_id);

  const authorResult = await pool.query('SELECT id FROM authors WHERE id = $1', [authorId]);
  if (authorResult.rows.length === 0) {
    const error = new Error('El autor no se encuentra registrado');
    error.statusCode = 404;
    throw error;
  }

  const postResult = await pool.query('SELECT id FROM posts WHERE id = $1', [postId]);
  if (postResult.rows.length === 0) {
    const error = new Error('El post no se encuentra registrado');
    error.statusCode = 404;
    throw error;
  }

  const { rows } = await pool.query(
    'INSERT INTO comments (post_id, author_id, content, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
    [postId, authorId, commentData.content, createdAt]
  );
  return rows[0];
};

const putCommentService = async (id, commentData = {}) => {
  const commentId = Number(id ?? commentData?.id);
  if (!Number.isInteger(commentId)) {
    return null;
  }

  const existingComment = await pool.query('SELECT id FROM comments WHERE id = $1', [commentId]);
  if (existingComment.rows.length === 0) {
    return null;
  }

  const allowedFields = ['content', 'post_id', 'author_id', 'created_at'];
  const fields = [];
  const values = [];

  Object.entries(commentData).forEach(([key, value]) => {
    if (key === 'id' || value === undefined || !allowedFields.includes(key)) {
      return;
    }
    fields.push(`${key} = $${fields.length + 1}`);
    values.push(value);
  });

  if (fields.length === 0) {
    return null;
  }

  values.push(commentId);
  const { rows } = await pool.query(
    `UPDATE comments SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
    values
  );
  return rows[0];
};

const deleteCommentService = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM comments WHERE id = $1', [id]);
  return rowCount > 0;
};

module.exports = {
  getCommentsService,
  getCommentByIdService,
  getCommentsByPostService,
  getCommentsByAuthorService,
  postCommentService,
  putCommentService,
  deleteCommentService
};
