const validateAuthorUpdateBody = (req, res, next) => {
  const { name, email, bio, ...rest } = req.body || {};
  const invalidFields = Object.keys(rest);

  if (invalidFields.length > 0) {
    return res.status(400).json({ status: 400, message: `Campos no permitidos para actualizar autor: ${invalidFields.join(', ')}` });
  }

  const hasAnyField = [name, email, bio].some((value) => value !== undefined);
  if (!hasAnyField) {
    return res.status(400).json({ status: 400, message: 'Debes enviar al menos un campo para actualizar el autor' });
  }

  if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
    return res.status(400).json({ status: 400, message: 'El nombre del autor debe ser un texto válido' });
  }

  if (email !== undefined && (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))) {
    return res.status(400).json({ status: 400, message: 'El email del autor no es válido' });
  }

  if (bio !== undefined && typeof bio !== 'string') {
    return res.status(400).json({ status: 400, message: 'La bio del autor debe ser texto' });
  }

  next();
};

const validatePostUpdateBody = (req, res, next) => {
  const { title, content, author_id, published, ...rest } = req.body || {};
  const invalidFields = Object.keys(rest);

  if (invalidFields.length > 0) {
    return res.status(400).json({ status: 400, message: `Campos no permitidos para actualizar post: ${invalidFields.join(', ')}` });
  }

  const hasAnyField = [title, content, author_id, published].some((value) => value !== undefined);
  if (!hasAnyField) {
    return res.status(400).json({ status: 400, message: 'Debes enviar al menos un campo para actualizar el post' });
  }

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ status: 400, message: 'El título del post debe ser un texto válido' });
  }

  if (content !== undefined && (typeof content !== 'string' || content.trim() === '')) {
    return res.status(400).json({ status: 400, message: 'El contenido del post debe ser un texto válido' });
  }

  if (author_id !== undefined) {
    const parsedAuthorId = Number(author_id);
    if (!Number.isInteger(parsedAuthorId) || parsedAuthorId <= 0) {
      return res.status(400).json({ status: 400, message: 'El author_id del post debe ser un número entero válido' });
    }
    req.body.author_id = parsedAuthorId;
  }

  if (published !== undefined && typeof published !== 'boolean') {
    return res.status(400).json({ status: 400, message: 'El campo published debe ser booleano' });
  }

  next();
};

module.exports = {
  validateAuthorUpdateBody,
  validatePostUpdateBody
};
