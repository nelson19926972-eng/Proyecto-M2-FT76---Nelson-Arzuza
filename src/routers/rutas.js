const { Router } = require('express')
const { welcomeController } = require('../controllers/bienvenida_controller')
const { getAuthorsController, getAuthorsByIdController, postAuthorsController, putAuthorsController } = require('../controllers/authors_controller')
const router = Router()


router.get('/', welcomeController)


router.get('/authors', getAuthorsController)
router.get('/authors/:id', getAuthorsByIdController)
router.post('/authors', postAuthorsController)
router.put('/authors/:id', putAuthorsController)


module.exports = {
    router
}