const {Pool} = require("pg")
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_MAX_CONNECTIONS, DB_IDLE_TIMEOUT, DB_CONNECTION_TIMEOUT, DATABASE_URL } = require("./envs")



const conexion_local = {
    host:DB_HOST,
    port:DB_PORT,
    database:DB_NAME,
    user:DB_USER,
    password:DB_PASSWORD,
    max:DB_MAX_CONNECTIONS,
    idleTimeoutMillis:DB_IDLE_TIMEOUT,
    connectionTimeoutMillis:DB_CONNECTION_TIMEOUT
}

const conexion_produccion = {
    connectionString: DATABASE_URL
    
}

const pool = new Pool( DATABASE_URL ? conexion_produccion : conexion_local)


module.exports = {
    pool
}