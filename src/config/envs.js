const { loadEnvFile } = require("node:process")

if (process.env.NODE_ENV !== "production") {
    loadEnvFile()
}



const PORT = process.env.PORT
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_MAX_CONNECTIONS = process.env.DB_MAX_CONNECTIONS
const DB_IDLE_TIMEOUT = process.env.DB_IDLE_TIMEOUT
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT
const DATABASE_URL = process.env.DATABASE_URL


module.exports = {
    PORT,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_MAX_CONNECTIONS,
    DB_IDLE_TIMEOUT,
    DATABASE_URL,
    DB_CONNECTION_TIMEOUT
}