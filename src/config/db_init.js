const fs = require("node:fs");
const path = require("node:path");
const { pool } = require("./db_conect");

const initializeDatabase = async () => {
    const seedPath = path.resolve(__dirname, "../../seed.sql");
    const seedSql = fs.readFileSync(seedPath, "utf8");

    await pool.query(seedSql);
    console.log("Base de datos inicializada correctamente desde seed.sql");
};

module.exports = {
    initializeDatabase
};