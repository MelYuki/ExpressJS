// Import variables d'env
require("dotenv").config()
// Destructuring des variable d'env
const {DB_NAME, DB_USER, DB_PWD} = process.env

// Config de la connexion avec la DB
const dbConfig = {
    user: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    server: "localhost",
    pool : {
        max: 10,
        min: 0,
        idleTimeoutMillis: 300000
    },
    options: {
        trustServerCertificate: true
    }
}

// Export du module créé
module.exports = dbConfig