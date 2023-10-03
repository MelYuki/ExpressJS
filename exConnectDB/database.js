// Import dépendances
require("dotenv").config()
const bcrypt = require("bcrypt")
const sql = require("mssql")

// Récup des infos .env
const {DB_USER, DB_PWD, DB_NAME} = process.env

// Config connexion MSSQL
const sqlConfig = {
    user: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    server: "localhost",
    // Paramètre de connections simultanées
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 300000
    },
    options: {
        // En true pour le dev
        // En false pour la prod /!\ FAILLE DE SECU /!\
        trustServerCertificate: true
    }
}

const queries = {
    getAll: async (req, res) => {
        try {
            // Connection à la DB
            await sql.connect(sqlConfig)
            // Envoi de la requete
            const result = await sql.query `SELECT * FROM infos`

            // Si résultat ok
            if (result) {
                res.sendStatus(200)
            }
            console.log(result)
        }
        catch(err) {
            // Si résultat pas ok
            console.error(err)
            res.sendStatus(404)
        }
    },

    getUserById: async (req, res) => {
        try {
            const {id} = req.params
            await sql.connect(sqlConfig)

            const result = await sql.query `SELECT * FROM infos WHERE infos_id = ${id}`

            if(result) {
                res.sendStatus(200)
            }
            console.log(result)
        }
        catch(err) {
            console.error(err)
            res.sendStatus(404)
        }
    },

    addUser: async (req, res) => {
        try {
            await sql.connect(sqlConfig)

            const {password, email, firstname, lastname} = req.body

            // 1param= valeur à hash, 2param= le salt(intensité)
            const hashedPassword = bcrypt.hashSync(password, 10)

            // SSMS => ALTER TABLE [nom de la table] ADD pseudo VARCHAR(6)

            const result = await sql.query `INSERT INTO infos (firstname, lastname, password, email, pseudo)
            VALUES (${firstname}, ${lastname}, ${hashedPassword}, ${email}, LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))))`

            if(result) {
                res.send("Ajout effectué").status(200)
            }
            console.log(result)
        }
        catch(err) {
            console.error(err)
            res.sendStatus(404)
        }
    },
    hashPwd: async (req, res) => {
        try {
            await sql.connect(sqlConfig)

            // Récup le password
            const {id} = req.params
            const pwd = await sql.query `SELECT password FROM infos WHERE infos_id = ${id}`
            // console.log(pwd)

            // On gère le cas où pas de pwd == pas de user
            // pwd.recordset.length == 0
            if(pwd.rowsAffected == 0) {
                // console.log("test")
                res.send("No such user exist").status(404)
            }
            else{
                const pwdStr = pwd.recordset[0].password

                // On hash le pwd
                const pwdHash = bcrypt.hashSync(pwdStr, 10)
                // console.log(pwdHash)

                // On update la DB avec le password hashé
                const result = await sql.query `UPDATE infos SET password = ${pwdHash} WHERE infos_id = ${id}`

                // Vérif et message ok
                if(result) {
                    console.log(pwdHash)
                    res.send("Password Sécurisé!").status(204)
                }
            }
        }
        catch(err) {
            console.error(err)
            res.sendStatus(404)
        }
    },
    updateUser: async (req, res) => {
        try {
            await sql.connect(sqlConfig)

            const {id} = req.params
            const {firstname, lastname, email, newPassword, oldPassword} = req.body

            // Récup du user
            const userQuery = await sql.query `SELECT * FROM infos WHERE infos_id = ${id}`
            // Récup des infos du user dans le recordset
            const user = userQuery.recordset[0]

            let hashedPassword
            // Vérif des input user
            if (newPassword && oldPassword) {
                // 1param= input user, 2param valeur hashé à comparer
                const isPasswordValid = bcrypt.compareSync(oldPassword, user.password)

                // Si pas valide
                if (!isPasswordValid) {
                    return res.status(401).send("Invalid Password")
                }
                // Si valide
                else{
                    hashedPassword = bcrypt.hashSync(newPassword, 10)
                }
            }

            if (!user) {
                console.log("No such user exist")
                res.sendStatus(404)
            }

            let update
            if(firstname && lastname && email && hashedPassword) {
                update = sql.query `UPDATE infos SET firstname = ${firstname},
                lastname = ${lastname},
                email = ${email},
                pseudo = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))),
                password = ${hashedPassword} WHERE infos_id = ${id}`
            }
            else if (firstname && lastname && email) {
                update = sql.query `UPDATE infos SET firstname = ${firstname},
                lastname = ${lastname},
                email = ${email},
                pseudo = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))) WHERE infos_id = ${id}`
            }
            else if (firstname && lastname && hashedPassword) {
                update = sql.query `UPDATE infos SET firstname = ${firstname},
                lastname = ${lastname},
                pseudo = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))),
                password = ${hashedPassword} WHERE infos_id = ${id}`
            }
            else if (firstname && lastname) {
                update = sql.query `UPDATE infos SET firstname = ${firstname},
                lastname = ${lastname},
                pseudo = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))) WHERE infos_id = ${id}`
            }
            else if (firstname && email && hashedPassword) {
                update = sql.query `UPDATE infos SET firstname = ${firstname},
                email = ${email},
                pseudo = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${user.lastname}, 3), 1, 3))),
                password = ${hashedPassword} WHERE infos_id = ${id}`
            }
            else if (firstname && email) {
                update = sql.query `UPDATE infos SET firstname = ${firstname},
                email = ${email},
                pseudo = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${user.lastname}, 3), 1, 3))) WHERE infos_id = ${id}`
            }
            else if (lastname && email && hashedPassword) {
                update = sql.query `UPDATE infos SET lastname = ${lastname},
                email = ${email},
                pseudo = LOWER(CONCAT(SUBSTRING(${user.firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))),
                password = ${hashedPassword} WHERE infos_id = ${id}`
            }
            else if (lastname && email) {
                update = sql.query `UPDATE infos SET lastname = ${lastname},
                email = ${email},
                pseudo = LOWER(CONCAT(SUBSTRING(${user.firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))) WHERE infos_id = ${id}`
            }
            else if (firstname && hashedPassword) {
                update = sql.query `UPDATE infos SET firstname = ${firstname},
                pseudo = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${user.lastname}, 3), 1, 3))),
                password = ${hashedPassword} WHERE infos_id = ${id}`
            }
            else if (firstname) {
                update = sql.query `UPDATE infos SET firstname = ${firstname},
                pseudo = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${user.lastname}, 3), 1, 3))) WHERE infos_id = ${id}`
            }
            else if (lastname && hashedPassword) {
                update = sql.query `UPDATE infos SET lastname = ${lastname},
                pseudo = LOWER(CONCAT(SUBSTRING(${user.firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))),
                password = ${hashedPassword} WHERE infos_id = ${id}`
            }
            else if (lastname) {
                update = sql.query `UPDATE infos SET lastname = ${lastname},
                pseudo = LOWER(CONCAT(SUBSTRING(${user.firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))) WHERE infos_id = ${id}`
            }
            else if (email && hashedPassword) {
                update = sql.query `UPDATE infos SET email = ${email},
                password = ${hashedPassword} WHERE infos_id = ${id}`
            }
            else if (email) {
                update = sql.query `UPDATE infos SET email = ${email} WHERE infos_id = ${id}`
            }
            else if (hashedPassword) {
                update = sql.query `UPDATE infos SET password = ${hashedPassword} WHERE infos_id = ${id}`
            }

            if(update) {
                const result = await update
                if(update) {
                    res.send("Modification.s effectuée.s").status(200)
                }
                console.log(result)
            }
        }
        catch(err) {
            console.error(err)
            res.sendStatus(404)
        }
    },
    deleteUser: async (req, res) => {
        try {
            await sql.connect(sqlConfig)
            const {id} = req.params

            const userSummon = await sql.query`SELECT * FROM infos WHERE infos_id = ${id}`
            const user = userSummon.recordset[0]
            console.log(user)
            if(!user) {
                res.send("No such user exist").status(404)
            }
            else{
                const result = await sql.query `DELETE FROM infos WHERE infos_id = ${id}`
                res.send("Suppression effectuée").status(204)
            }
        }
        catch(err) {
            console.error(err)
            res.sendStatus(404)
        }
    }
}

module.exports = queries
