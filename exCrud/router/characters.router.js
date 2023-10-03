// 11) Création du dossier router, qui va gérer le routing des données,
    // Et du fichier characters.router.js

// 12) Import du controller
const CharactersController = require("../controllers/characters.controller")

// 13) Import du router d'express UNIQUEMENT
const charactersRouter = require("express").Router()

// 14) Création de la route,
// 14-1) de récupération de tous les personnages
charactersRouter.get("/", CharactersController.getAll)
// 14-2) de récupération par id
charactersRouter.get("/:id([0-9]+)", CharactersController.getById)
// 14-3) d'ajout d'un personnage
charactersRouter.post("/", CharactersController.add)
// 14-4) de modification de personnage par id
charactersRouter.put("/:id([0-9]+)", CharactersController.update)
// 14-5) de suppression de personnage par id
charactersRouter.delete("/:id([0-9]+)", CharactersController.delete)

// 15) Export du router des characters
module.exports = charactersRouter
