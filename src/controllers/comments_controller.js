const {
  getCommentsService,
  getCommentByIdService,
  getCommentsByPostService,
  getCommentsByAuthorService,
  postCommentService,
  putCommentService,
  deleteCommentService
} = require('../services/comments_services');

const getCommentsController = async (req, res) => {
  try {
    const comments = await getCommentsService();

    if (!comments || comments.length === 0) {
      return res.status(200).json({ status: 200, message: 'No se encontro ningun comentario', data: [] });
    }

    res.status(200).json({ status: 200, message: 'Comentarios obtenidos correctamente', data: comments });
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).json({ status: 500, message: 'Error al obtener los comentarios' });
  }
};

const getCommentByIdController = async (req, res) => {
  const commentId = Number(req.params.id);

  if (!Number.isInteger(commentId)) {
    return res.status(400).json({ status: 400, message: 'El id del comentario no es válido' });
  }

  try {
    const comment = await getCommentByIdService(commentId);
    if (comment) {
      res.status(200).json({ status: 200, message: 'Comentario encontrado', data: comment });
    } else {
      res.status(404).json({ status: 404, message: 'Comentario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el comentario por ID:', error);
    res.status(500).json({ status: 500, message: 'Error al obtener el comentario por ID' });
  }
};

const getCommentsByPostController = async (req, res) => {
  const postId = Number(req.params.postId);

  if (!Number.isInteger(postId)) {
    return res.status(400).json({ status: 400, message: 'El id del post no es válido' });
  }

  try {
    const comments = await getCommentsByPostService(postId);
    if (comments.length > 0) {
      res.status(200).json({ status: 200, message: 'Comentarios del post obtenidos correctamente', data: comments });
    } else {
      res.status(404).json({ status: 404, message: 'No se encontraron comentarios para este post' });
    }
  } catch (error) {
    console.error('Error al obtener los comentarios del post:', error);
    res.status(500).json({ status: 500, message: 'Error al obtener los comentarios del post' });
  }
};

const getCommentsByAuthorController = async (req, res) => {
  const authorId = Number(req.params.authorId);

  if (!Number.isInteger(authorId)) {
    return res.status(400).json({ status: 400, message: 'El id del autor no es válido' });
  }

  try {
    const comments = await getCommentsByAuthorService(authorId);
    if (comments.length > 0) {
      res.status(200).json({ status: 200, message: 'Comentarios del autor obtenidos correctamente', data: comments });
    } else {
      res.status(404).json({ status: 404, message: 'No se encontraron comentarios para este autor' });
    }
  } catch (error) {
    console.error('Error al obtener los comentarios del autor:', error);
    res.status(500).json({ status: 500, message: 'Error al obtener los comentarios del autor' });
  }
};

const postCommentController = async (req, res) => {
  try {
    const newComment = await postCommentService(req.body);
    res.status(201).json({ status: 201, message: 'Comentario creado correctamente', data: newComment });
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    res.status(500).json({ status: 500, message: 'Error al crear el comentario' });
  }
};

const putCommentController = async (req, res) => {
  const commentId = Number(req.params.id ?? req.body?.id);

  if (!Number.isInteger(commentId)) {
    return res.status(400).json({ status: 400, message: 'El id del comentario no es válido' });
  }

  try {
    const updatedComment = await putCommentService(commentId, req.body);
    if (updatedComment) {
      res.status(200).json({ status: 200, message: 'Comentario actualizado correctamente', data: updatedComment });
    } else {
      res.status(404).json({ status: 404, message: `Comentario no encontrado con id ${commentId}` });
    }
  } catch (error) {
    console.error('Error al actualizar el comentario:', error);
    res.status(500).json({ status: 500, message: 'Error al actualizar el comentario' });
  }
};

const deleteCommentController = async (req, res) => {
  const commentId = Number(req.params.id);

  if (!Number.isInteger(commentId)) {
    return res.status(400).json({ status: 400, message: 'El id del comentario no es válido' });
  }

  try {
    const deleted = await deleteCommentService(commentId);
    if (deleted) {
      res.status(200).json({ status: 200, message: 'Comentario eliminado correctamente', data: null });
    } else {
      res.status(404).json({ status: 404, message: 'Comentario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    res.status(500).json({ status: 500, message: 'Error al eliminar el comentario' });
  }
};

module.exports = {
  getCommentsController,
  getCommentByIdController,
  getCommentsByPostController,
  getCommentsByAuthorController,
  postCommentController,
  putCommentController,
  deleteCommentController
};
