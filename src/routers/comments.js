const { Router } = require('express');
const {
  getCommentsController,
  getCommentByIdController,
  getCommentsByPostController,
  getCommentsByAuthorController,
  postCommentController,
  putCommentController,
  deleteCommentController
} = require('../controllers/comments_controller');
const { validateIdParam, validateDeleteIdParam } = require('../middlewares/params');
const { validateCommentBody } = require('../middlewares/bodyValidators');
const { validateCommentUpdateBody } = require('../middlewares/updateValidators');

const router = Router();

router.get('/', getCommentsController);
router.get('/post/:postId', validateIdParam('postId'), getCommentsByPostController);
router.get('/author/:authorId', validateIdParam('authorId'), getCommentsByAuthorController);
router.get('/:id', validateIdParam('id'), getCommentByIdController);
router.post('/', validateCommentBody, postCommentController);
router.put('/:id', validateIdParam('id'), validateCommentUpdateBody, putCommentController);
router.delete('/:id', validateDeleteIdParam, deleteCommentController);

module.exports = {
  router
};
