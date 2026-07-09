const { Router } = require('express')
const { welcomeController } = require('../controllers/bienvenida_controller')
const { getAuthorsController, getAuthorsByIdController } = require('../controllers/authors_controller')
const router = Router()

router.get('/', welcomeController)

router.get('/authors', getAuthorsController)
router.get('/authors/:id', getAuthorsByIdController)

module.exports = {
    router
}