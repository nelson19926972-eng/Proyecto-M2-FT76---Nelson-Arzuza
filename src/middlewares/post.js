const validateAuthorBody = (req, res, next) => {
  const { name, email, bio } = req.body || {};

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ status: 400, message: 'El nombre del autor es obligatorio' });
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ status: 400, message: 'El email del autor no es válido' });
  }

  if (bio !== undefined && typeof bio !== 'string') {
    return res.status(400).json({ status: 400, message: 'La bio del autor debe ser texto' });
  }

  next();
};

const validatePostBody = (req, res, next) => {
  const { title, content, author_id, published } = req.body || {};

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ status: 400, message: 'El título del post es obligatorio' });
  }

  if (typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({ status: 400, message: 'El contenido del post es obligatorio' });
  }

  const parsedAuthorId = Number(author_id);
  if (!Number.isInteger(parsedAuthorId) || parsedAuthorId <= 0) {
    return res.status(400).json({ status: 400, message: 'El author_id del post debe ser un número entero válido' });
  }

  if (published !== undefined && typeof published !== 'boolean') {
    return res.status(400).json({ status: 400, message: 'El campo published debe ser booleano' });
  }

  req.body.author_id = parsedAuthorId;
  next();
};

module.exports = {
  validateAuthorBody,
  validatePostBody
};
