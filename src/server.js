const express = require('express')
const { router } = require('./routers/rutas')
const { swaggerUi, swaggerSpec } = require('./config/swagger')
const server = express()

server.use(express.json())
server.use((req, res, next) => {
    const start = Date.now()

    res.on('finish', () => {
        console.log('[INFO][request]', {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl || req.url,
            status: res.statusCode,
            durationMs: Date.now() - start
        })
    })

    next()
})

server.get('/api-docs.json', (req, res) => {
    res.json(swaggerSpec)
})
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
server.use(router)

module.exports = {
    server
}