// Import des variables d'environnement
require("dotenv").config()
// Destructuring du env
const {PORT} = process.env

// Import des modules
const express = require("express")
const app = express()
const path = require("path")
// Import du router
const router = require("./router/router")

// Mise en place du moteur de templating
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

// Import du dossier public
app.use(express.static(path.join(__dirname, "public")))

// Express utilise le json
app.use(express.json())

// Pour la page contacts
app.use(express.urlencoded({extended: true}))

// Utilisation du router
app.use(router)

// Lancement du server
app.listen(PORT, () => {
    console.log(`Serveur is running on port: ${PORT}`)
})

// TODO:

// Ajouter les pages pour la gestion des products
// - une page avec la liste des products
// Elle affiche le nom et le prix de chaque produits et un lien vers la page de détails
// - une page avec le detail d'un produit
// Elle affiche toutes les données d'un produit avec son image
