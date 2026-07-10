const { pool } = require("./src/config/db_conect")
const { initializeDatabase } = require("./src/config/db_init")
const { PORT } = require("./src/config/envs")
const { server } = require("./src/server")

const startServer = async () => {

    await pool.query('SELECT 1')
    await initializeDatabase()
    console.log('Conexión a la base de datos establecida correctamente')

    server.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT)
})

}

startServer()

process.on('SIGINT', async () => {
    await pool.end()
    process.exit(0)
})
