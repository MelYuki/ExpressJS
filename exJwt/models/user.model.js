const sql = require("mssql")

const UserModel = {
    getAll: async () => {
        try {
            const request = await sql.query `SELECT * FROM infos`
            return request
        }
        catch(err) {
            console.error(err)
        }
    },

    register: async (data) => {
        try {
            const {email, hashedPassword, firstname, lastname} = data
            const request = await sql.query `INSERT INTO infos (firstname, lastname, password, email)
            VALUES (${firstname}, ${lastname}, ${hashedPassword}, ${email})`

            return request
        }
        catch(err) {
            console.error(err)
        }
    },

    addJwt: async (data) => {
        try {
            const {token, id} = data
            const request = await sql.query `UPDATE infos SET jwt = ${token} WHERE infos_id = ${id}`

            // ALTER TABLE infos ADD jwt

            return request
        }
        catch(err) {
            console.error(err)
        }
    }
}

module.exports = UserModel