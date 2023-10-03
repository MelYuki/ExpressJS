// 1) Import du module express
const express = require("express")
// 2) Initialisation du server express
const app = express()
// Création de la constante du port qui sera utilisé
const port = 8006

// 21) Import du router général
const router = require("./router/router")

// 5) Dire à express qu'il va travailler avec du json
app.use(express.json())

// 22) Dire qu'on utilise le router général uniquement avec "/api"
app.use("/api", router)

// 3) Lancement du server express
app.listen(port, () => {
    // Vérification de l'écoute du server sur le port choisi
    console.log(`Server is running on port: ${port}`)
})

// 4) Création du dossier data,
    // Et du fichier de données characters.json (+implémentation manuelle)
