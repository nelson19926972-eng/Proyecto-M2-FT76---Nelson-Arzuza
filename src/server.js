const express = require('express')
const { router } = require('./routers/rutas')
const server = express()

server.use(express.json())
server.use((req, res, next) => {
    const start = Date.now()

    res.on('finish', () => {
        console.log('[INFO][request]', {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl || req.url,
            from: req.headers.origin || req.headers.referer || 'unknown',
            status: res.statusCode,
            durationMs: Date.now() - start
        })
    })

    next()
})
server.use(router)

module.exports = {
    server
}