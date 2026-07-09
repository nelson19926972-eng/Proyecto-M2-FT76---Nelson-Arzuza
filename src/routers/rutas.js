const { Router } = require('express')
const { welcomeController } = require('../controllers/bienvenida_controller')
const router = Router()

router.get('/', welcomeController)

module.exports = {
    router
}