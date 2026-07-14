const {
  isNonEmptyString,
  isValidEmail,
  parsePositiveInteger
} = require('./validationHelpers');

const validateAuthorBody = (req, res, next) => {
  const { name, email, bio } = req.body || {};

  if (!isNonEmptyString(name)) {
    return res.status(400).json({ status: 400, message: 'El nombre del autor es obligatorio' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ status: 400, message: 'El email del autor no es válido' });
  }

  if (bio !== undefined && typeof bio !== 'string') {
    return res.status(400).json({ status: 400, message: 'La bio del autor debe ser texto' });
  }

  next();
};

const validatePostBody = (req, res, next) => {
  const { title, content, author_id, published } = req.body || {};

  if (!isNonEmptyString(title)) {
    return res.status(400).json({ status: 400, message: 'El título del post es obligatorio' });
  }

  if (!isNonEmptyString(content)) {
    return res.status(400).json({ status: 400, message: 'El contenido del post es obligatorio' });
  }

  const parsedAuthorId = parsePositiveInteger(author_id);
  if (parsedAuthorId === null) {
    return res.status(400).json({ status: 400, message: 'El author_id del post debe ser un número entero válido' });
  }

  if (published !== undefined && typeof published !== 'boolean') {
    return res.status(400).json({ status: 400, message: 'El campo published debe ser booleano' });
  }

  req.body.author_id = parsedAuthorId;
  next();
};

const validateCommentBody = (req, res, next) => {
  const { content, post_id, author_id } = req.body || {};

  if (!isNonEmptyString(content)) {
    return res.status(400).json({ status: 400, message: 'El contenido del comentario es obligatorio' });
  }

  const parsedPostId = parsePositiveInteger(post_id);
  if (parsedPostId === null) {
    return res.status(400).json({ status: 400, message: 'El post_id del comentario debe ser un número entero válido' });
  }

  const parsedAuthorId = parsePositiveInteger(author_id);
  if (parsedAuthorId === null) {
    return res.status(400).json({ status: 400, message: 'El author_id del comentario debe ser un número entero válido' });
  }

  req.body.post_id = parsedPostId;
  req.body.author_id = parsedAuthorId;
  next();
};

module.exports = {
  validateAuthorBody,
  validatePostBody,
  validateCommentBody
};
