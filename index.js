const { pool } = require("./src/config/db_conect")
const { server } = require("./src/server")
const { loadEnvFile } = require("node:process")
loadEnvFile()


const startServer = async () => {

    await pool.query('SELECT 1')
    console.log('Conexión a la base de datos establecida correctamente')

    server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000')
})

}

startServer()

process.on('SIGINT', async () => {
    await pool.end()
    process.exit(0)
})
