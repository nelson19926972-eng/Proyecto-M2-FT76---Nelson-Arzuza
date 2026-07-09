const { pool } = require("../config/db_conect");

const getPostsService = async () => {
  const { rows } = await pool.query('SELECT * FROM posts');
  return rows;
};

const getPostByIdService = async (id) => {
  const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return rows[0];
};

const getPostsByAuthorService = async (authorId) => {
  const { rows } = await pool.query(
    `SELECT p.*, a.id AS author_id_detail, a.name AS author_name, a.email AS author_email, a.bio AS author_bio, a.created_at AS author_created_at
     FROM posts p
     INNER JOIN authors a ON p.author_id = a.id
     WHERE p.author_id = $1`,
    [authorId]
  );
  return rows;
};

const postPostService = async (postData) => {
  const createdAt = postData?.created_at && postData.created_at !== ''
    ? postData.created_at
    : new Date().toISOString();

  const published = postData?.published === undefined || postData?.published === null || postData?.published === ''
    ? true
    : postData.published;

  const { rows } = await pool.query(
    'INSERT INTO posts (title, content, author_id, published, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [postData.title, postData.content, postData.author_id, published, createdAt]
  );
  return rows[0];
};

const putPostService = async (id, postData = {}) => {
  const postId = Number(id ?? postData?.id);

  if (!Number.isInteger(postId)) {
    return null;
  }

  const existingPost = await pool.query('SELECT id FROM posts WHERE id = $1', [postId]);
  if (existingPost.rows.length === 0) {
    return null;
  }

  const allowedFields = ['title', 'content', 'author_id', 'published', 'created_at'];
  const fields = [];
  const values = [];

  Object.entries(postData).forEach(([key, value]) => {
    if (key === 'id' || value === undefined || !allowedFields.includes(key)) {
      return;
    }

    fields.push(`${key} = $${fields.length + 1}`);
    values.push(value);
  });

  if (fields.length === 0) {
    return null;
  }

  values.push(postId);
  const { rows } = await pool.query(
    `UPDATE posts SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
    values
  );
  return rows[0];
};

const deletePostService = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
  return rowCount > 0;
};

module.exports = {
  getPostsService,
  getPostByIdService,
  getPostsByAuthorService,
  postPostService,
  putPostService,
  deletePostService
};
