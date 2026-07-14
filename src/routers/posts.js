const { Router } = require('express');
const {
  getPostsController,
  getPostByIdController,
  getPostsByAuthorController,
  postPostController,
  putPostController,
  deletePostController
} = require('../controllers/posts_controllers');
const { validateIdParam, validateDeleteIdParam } = require('../middlewares/params');
const { validatePostBody } = require('../middlewares/bodyValidators');
const { validatePostUpdateBody } = require('../middlewares/updateValidators');

const router = Router();

router.get('/', getPostsController);
router.get('/author/:authorId', validateIdParam('authorId'), getPostsByAuthorController);
router.get('/:id', validateIdParam('id'), getPostByIdController);
router.post('/', validatePostBody, postPostController);
router.put('/:id', validateIdParam('id'), validatePostUpdateBody, putPostController);
router.delete('/:id', validateDeleteIdParam, deletePostController);

module.exports = {
  router
};
