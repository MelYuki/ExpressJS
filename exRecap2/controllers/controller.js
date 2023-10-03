// Import des modules créés
const UserModel = require("../models/model")
const dbConfig = require("../db/database")
// Import des modules internes
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sql = require("mssql")

// Création du controller
const UserController = {
    // Init method getAll (/admin) pour vérifier que la connection à la DB est ok
    getAll: async (req, res) => {
        try {
            await sql.connect(dbConfig)
            const result = await UserModel.getAll()

            if(result) {
                console.log(result)
                res.sendStatus(200)
            }
        }
        catch(err) {
            console.error(err)
            res.sendStatus(404)
        }
    },
    // Init du render registerForm
    register_get: (req,res) => {
        res.render("registerForm/registerForm", {
            data: {},
            errors: {}
        })
    },
    register_post: async (req, res) => {
        try {
            await sql.connect(dbConfig)
            const {firstname, lastname, tel, city, email, pseudo, password} = req.body
            // const hashPassword = bcrypt.hashSync(password, 10)
            console.log(req.body)

            const result = await UserModel.register({firstname, lastname, tel, city, email, pseudo, password})

            if(result) {
                res.redirect("/")
                // alert(`Vous êtes bien enregistré ${pseudo}`)
            }
        }
        catch(err) {
            console.error(err)
            res.sendStatus(404)
        }
    },
    login_get: (req, res) => {
        res.render("login/index")
    }// },
    // login_post: (req, res) => {
        
    // }
}

module.exports = UserController