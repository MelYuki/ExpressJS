const UserModel = require("../models/user.model")
const sqlConfig = require("../db/database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sql = require("mssql")

const UserController = {
    getAll: async (req, res) => {
        try {
            await sql.connect(sqlConfig)
            const result = await UserModel.getAll()

            console.log(result)
            if(result) {
                res.sendStatus(200)
            }
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
    login: async (req, res) => {
        try {
            await sql.connect(sqlConfig)
            const {email, password} = req.body

            const userQuery = await sql.query `SELECT * FROM infos WHERE email = ${email}`
            console.log(userQuery)
            const user = userQuery.recordset[0]

            if(user.jwt) {
                return res.sendStatus(200).redirect("/list")
            }
            else if(password) {
                const isPasswordValid = bcrypt.compareSync(password, user.password)

                if(!isPasswordValid) {
                    return res.send("Invalid Password").status(401)
                }

                const id = user.infos_id
                const payload = {
                    userId: id,
                    email: email
                }
                const options = {
                    expiresIn: "1d"
                }

                const secret = process.env.JWT_SECRET
                const token = jwt.sign(payload, secret, options)
                const clientJwt = await UserModel.addJwt({token, id})

                if(clientJwt) {
                    res.setHeader("Authorization", `Bearer ${token}`)
                    res.status(200).json({token})
                }
            }

            if(!user) {
                console.log("No such user exist")
                res.sendStatus(404)
            }
        }
        catch(err) {
            console.error(err)
            res.sendStatus(404)
        }
    },
    register: async (req, res) => {
        try {
            await sql.connect(sqlConfig)
            const {password, email, firstname, lastname} = req.body
            const hashedPassword = bcrypt.hashSync(password, 10)

            const result = await UserModel.register({email, hashedPassword, firstname, lastname})

            if(result) {
                res.send("Ajout effectué").status(200)
            }
        }
        catch(err) {
            console.error(err)
            res.sendStatus(404)
        }
    },
    protected: async (req, res) => {
        // Peut et doit être assimilée au moment de la méthode login
        try {
            const authHeader = req.headers["authorization"]
            console.log(authHeader)
            const token = authHeader && authHeader.split(" ")[1]
            console.log(token)
            const secret = process.env.JWT_SECRET

            if(token == null) {
                return res.sendStatus(401)
            }

            jwt.verify(token, secret, (err, payload) => {
                if(err) {
                    return res.sendStatus(403)
                }

                req.user = payload
                res.send("Accès autorisé")
            })
        }
        catch(err) {
            console.error(err)
            res.sendStatus(404)
        }
    }
}

module.exports = UserController