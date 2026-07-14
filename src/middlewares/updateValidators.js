const {
  isNonEmptyString,
  isValidEmail,
  parsePositiveInteger
} = require('./validationHelpers');

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

  if (name !== undefined && !isNonEmptyString(name)) {
    return res.status(400).json({ status: 400, message: 'El nombre del autor debe ser un texto válido' });
  }

  if (email !== undefined && !isValidEmail(email)) {
    return res.status(400).json({ status: 400, message: 'El email del autor no es válido' });
  }

  if (bio !== undefined && typeof bio !== 'string') {
    return res.status(400).json({ status: 400, message: 'La bio del autor debe ser texto' });
  }

  next();
};

const validatePostUpdateBody = (req, res, next) => {
  const { title, content, published, ...rest } = req.body || {};
  const invalidFields = Object.keys(rest);

  if (invalidFields.length > 0) {
    return res.status(400).json({ status: 400, message: `Campos no permitidos para actualizar post: ${invalidFields.join(', ')}` });
  }

  const hasAnyField = [title, content, published].some((value) => value !== undefined);
  if (!hasAnyField) {
    return res.status(400).json({ status: 400, message: 'Debes enviar al menos un campo para actualizar el post' });
  }

  if (title !== undefined && !isNonEmptyString(title)) {
    return res.status(400).json({ status: 400, message: 'El título del post debe ser un texto válido' });
  }

  if (content !== undefined && !isNonEmptyString(content)) {
    return res.status(400).json({ status: 400, message: 'El contenido del post debe ser un texto válido' });
  }

  if (published !== undefined && typeof published !== 'boolean') {
    return res.status(400).json({ status: 400, message: 'El campo published debe ser booleano' });
  }

  next();
};

const validateCommentUpdateBody = (req, res, next) => {
  const { content, ...rest } = req.body || {};
  const invalidFields = Object.keys(rest);

  if (invalidFields.length > 0) {
    return res.status(400).json({ status: 400, message: `Campos no permitidos para actualizar comentario: ${invalidFields.join(', ')}` });
  }

  const hasAnyField = content !== undefined;
  if (!hasAnyField) {
    return res.status(400).json({ status: 400, message: 'Debes enviar al menos un campo para actualizar el comentario' });
  }

  if (content !== undefined && !isNonEmptyString(content)) {
    return res.status(400).json({ status: 400, message: 'El contenido del comentario debe ser un texto válido' });
  }

  next();
};

module.exports = {
  validateAuthorUpdateBody,
  validatePostUpdateBody,
  validateCommentUpdateBody
};
