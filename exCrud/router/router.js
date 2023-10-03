// 16) Création du fichier (router.js) de routing général, qui va gérer les router spécifiques,

// 17) Import du router des characters
const charactersRouter = require("./characters.router")

// 18) Import du router d'express UNIQUEMENT
const router = require("express").Router()

// 19) Dire qu'on utilise le router des characters uniquement avec "/characters"
router.use("/characters", charactersRouter)

// 20) Export du router général.
module.exports = router
