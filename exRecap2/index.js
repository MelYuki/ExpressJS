// TODO:
// OK 1) Créer en pug une page d'enregistrement ( ajouter un lien sur la page de login )
// OK 2) Créer en pug un form et permettre une connexion user (login)
// 3) Créer en pug une liste avec tous les users une fois connecté
// 4) Créer en pug une page details user en cliquant sur son nom de la liste du 3)
// 5) Créer une méthode getById (en lien avec 3) et 4))
// 6) Adapter la fonction de login pour inclure une vérif token (Si expiré -> màj)

// Import express
const express = require("express")
const app = express()
// Import variable d'env
require("dotenv").config()
const { PORT } = process.env
// Import router
const router = require("./router/router")
// Import module path
const path = require("path")

// IL EST IMPORTANT DE DIRE A EXPRESS DE USE AVANT DE SET ET PAS L'INVERSE
// SINON IL NE SERA JAMAIS SET!!!!!!!!!!!!!!!!!!!!

// Pour garder les éléments déjà écrit dans les formulaires
app.use(express.urlencoded({extended: true}))
// Init json using
app.use(express.json())
// Init pug views
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))
// Init router using
app.use(router)
//Init public file using
app.use(express.static(path.join(__dirname, "public")))

// Init de l'écoute du server
app.listen(PORT, () => {
    console.log(`Server is running correctly on port: ${PORT}`)
})
