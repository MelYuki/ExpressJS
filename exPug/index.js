// 0) Import d'express
const express = require("express")
// 0) Initialisation du server express
const app = express()
// 0) Déclaration du port qui sera utilisé
const port = 8008

// BONUS: Import du module path pour qd on a bcp de dossier
const path = require("path")

// 3) Import du fichier de données
const products = require("./datas/products.json")

const productsDetails = require("./datas/details.json")

// 1) Initialisation du moteur de templating
app.set("view engine", "pug")
// Dire à express d'utiliser des views qui se trouvent dans le dossier indiqué par le path
app.set("views", path.join(__dirname, "views"))
/*
2)
Création du dossier datas et du fichier products.json
Pour y intégrer manuellement nos données
*/

// 7) Création du dossier public qui contiendra les fichiers statiques
app.use(express.static(path.join(__dirname, "public")))

// 6) Création de la route de rendering
app.get("/", (req,res) => {
    // Envoi du rendering du template main en réponse, avec les données
    res.render("main", {products: products})
})

app.get("/details", (req,res) => {
    res.render("details", {details: productsDetails})
})

// 0) Lancement du server express
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

/*
8)
Dans le dossier public,
Création du dossier CSS et du fichier index.css
*/
