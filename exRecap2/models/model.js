// Import de MSSQL
const sql = require("mssql")

// Création du modèle de requête
const UserModel = {
    // Init method getAll (/admin) pour vérifier que les requêtes sont ok
    getAll: () => {
        try {
            const request = sql.query `SELECT * FROM users`
            return request
        }
        catch(err) {
            console.error(err)
        }
    },
    register: async (data) => {
        try {
            const {firstname, lastname, tel, city, email, pseudo, hashPassword} = data
            console.log(data)

            const request = await sql.query `INSERT INTO users (firstname, lastname, tel, city, email, pseudo, password)
            VALUES (${firstname}, ${lastname}, ${tel}, ${city}, ${email}, ${pseudo}, ${hashPassword})`

            return request
        }
        catch(err) {
            console.error(err)
        }
    }
}

// Export du module
module.exports = UserModel