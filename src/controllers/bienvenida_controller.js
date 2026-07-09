const welcomeController = (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Bienvenido a mi aplicación web',
        data: null
    })
}

module.exports = {
    welcomeController
}