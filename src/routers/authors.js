const { Router } = require('express');
const {
  getAuthorsController,
  getAuthorsByIdController,
  postAuthorsController,
  putAuthorsController,
  deleteAuthorsController
} = require('../controllers/authors_controller');
const { validateIdParam, validateDeleteIdParam } = require('../middlewares/params');
const { validateAuthorBody } = require('../middlewares/bodyValidators');
const { validateAuthorUpdateBody } = require('../middlewares/updateValidators');

const router = Router();

router.get('/', getAuthorsController);
router.get('/:id', validateIdParam('id'), getAuthorsByIdController);
router.post('/', validateAuthorBody, postAuthorsController);
router.put('/:id', validateIdParam('id'), validateAuthorUpdateBody, putAuthorsController);
router.delete('/:id', validateDeleteIdParam, deleteAuthorsController);

module.exports = {
  router
};
