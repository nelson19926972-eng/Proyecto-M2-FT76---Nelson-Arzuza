const { Router } = require('express')
const { welcomeController } = require('../controllers/bienvenida_controller')
const { getAuthorsController, getAuthorsByIdController, postAuthorsController, putAuthorsController, deleteAuthorsController } = require('../controllers/authors_controller')
const { getPostsController, getPostByIdController, getPostsByAuthorController, postPostController, putPostController, deletePostController } = require('../controllers/posts_controllers')
const { getCommentsController, getCommentByIdController, getCommentsByPostController, getCommentsByAuthorController, postCommentController, putCommentController, deleteCommentController } = require('../controllers/comments_controller')
const { validateIdParam } = require('../middlewares/get')
const { validateAuthorBody, validatePostBody, validateCommentBody } = require('../middlewares/post')
const { validateAuthorUpdateBody, validatePostUpdateBody, validateCommentUpdateBody } = require('../middlewares/put')
const { validateDeleteIdParam } = require('../middlewares/delete')
const router = Router()


router.get('/', welcomeController)


router.get('/authors', getAuthorsController)
router.get('/authors/:id', validateIdParam('id'), getAuthorsByIdController)
router.post('/authors', validateAuthorBody, postAuthorsController)
router.put('/authors/:id', validateIdParam('id'), validateAuthorUpdateBody, putAuthorsController)
router.delete('/authors/:id', validateDeleteIdParam, deleteAuthorsController)
router.get('/posts', getPostsController)
router.get('/posts/author/:authorId', validateIdParam('authorId'), getPostsByAuthorController)
router.get('/posts/:id', validateIdParam('id'), getPostByIdController)
router.post('/posts', validatePostBody, postPostController)
router.put('/posts/:id', validateIdParam('id'), validatePostUpdateBody, putPostController)
router.delete('/posts/:id', validateDeleteIdParam, deletePostController)

router.get('/comments', getCommentsController)
router.get('/comments/post/:postId', validateIdParam('postId'), getCommentsByPostController)
router.get('/comments/author/:authorId', validateIdParam('authorId'), getCommentsByAuthorController)
router.get('/comments/:id', validateIdParam('id'), getCommentByIdController)
router.post('/comments', validateCommentBody, postCommentController)
router.put('/comments/:id', validateIdParam('id'), validateCommentUpdateBody, putCommentController)
router.delete('/comments/:id', validateDeleteIdParam, deleteCommentController)

module.exports = {
    router
}