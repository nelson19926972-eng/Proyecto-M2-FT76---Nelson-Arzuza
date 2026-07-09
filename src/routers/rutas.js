const { Router } = require('express')
const { welcomeController } = require('../controllers/bienvenida_controller')
const { getAuthorsController, getAuthorsByIdController, postAuthorsController, putAuthorsController, deleteAuthorsController } = require('../controllers/authors_controller')
const { getPostsController, getPostByIdController, getPostsByAuthorController, postPostController, putPostController, deletePostController } = require('../controllers/posts_controllers')
const router = Router()


router.get('/', welcomeController)


router.get('/authors', getAuthorsController)
router.get('/authors/:id', getAuthorsByIdController)
router.post('/authors', postAuthorsController)
router.put('/authors/:id', putAuthorsController)
router.delete('/authors/:id', deleteAuthorsController)
router.get('/posts', getPostsController)
router.get('/posts/author/:authorId', getPostsByAuthorController)
router.get('/posts/:id', getPostByIdController)
router.post('/posts', postPostController)
router.put('/posts/:id', putPostController)
router.delete('/posts/:id', deletePostController)


module.exports = {
    router
}