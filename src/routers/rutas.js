const { Router } = require('express')
const { welcomeController } = require('../controllers/bienvenida_controller')
const { getAuthorsController, getAuthorsByIdController, postAuthorsController } = require('../controllers/authors_controller')
const router = Router()


router.get('/', welcomeController)


router.get('/authors', getAuthorsController)
router.get('/authors/:id', getAuthorsByIdController)
router.post('/authors', postAuthorsController)


module.exports = {
    router
}