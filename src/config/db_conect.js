const {Pool} = require("pg")
const { loadEnvFile } = require("node:process")
loadEnvFile()

const pool = new Pool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: process.env.DB_MAX_CONNECTIONS,
    idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT,
    connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT

})


module.exports = {
    pool
}