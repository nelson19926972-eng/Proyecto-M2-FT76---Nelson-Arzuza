const { Router } = require('express');
const { welcomeController } = require('../controllers/bienvenida_controller');
const { router: authorsRouter } = require('./authors');
const { router: postsRouter } = require('./posts');
const { router: commentsRouter } = require('./comments');

const router = Router();

router.get('/', welcomeController);
router.use('/authors', authorsRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);

module.exports = {
  router
};