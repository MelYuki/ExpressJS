// 6) Création du dossier controllers, qui va gérer nos opérations,
    // Et du fichier characters.controller.js

// 7) Import des personnages
const characters = require("../data/characters.json")

// 9-3*) Création de l'auto-incrémentation
let lastCharacterId = Math.max(...characters.map(c => c.id))

// 8) Création du controller
const CharactersController = {

    // 9) Création des méthodes
    // 9-1) La méthode getAll
    getAll: (req, res) => {
        // Prépa de l'objet data qui contiendra l'action d'itération (.map) du tableau d'objet characters
        const data = characters.map(c => ({
            id: c.id,
            firstname: c.firstname,
            lastname: c.lastname
        }))
        // Vérifiaction du contenu de data dans le log
        console.log(data)
        // Envoi de la réponse au format json
        res.json(data)
    },

    // 9-2) La méthode getById
    getById: (req, res) => {
        // Récupération de l'id dans l'url (.params) et typage
        const id = parseInt(req.params.id)
        // Récupération du personnage selon l'id entré en paramètre
        const character = characters.find(c => c.id === id)
        // Envoi d'une erreur 404 si aucun personnage trouvé
        if(!character) {
            res.sendStatus(404)
            return
        }
        // Vérifiaction du contenu de character dans le log
        console.log(character)
        // Envoi de la réponse (personnage trouvé) au format json
        res.json(character)
    },

    // 9-3) La méthode add
    add: (req, res) => {
        // Vérification des données reçues venant du body (postman)
        console.log("Donnée reçue: ", req.body)
        // Utilisation de l'auto-incrémentation (9-3*)
        lastCharacterId++
        // Création de l'objet (data) à ajouter
        const data = {
            id: lastCharacterId,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            serie: req.body.serie
        }
        // Ajout des données dans la collection des personnages
        characters.push(data)
        // Vérification des nouvelles données
        console.log(data)
        // Envoi d'un code de succès en réponse
        res.status(201).json(data)
    },

    // 9-4) La méthode update
    update: (req, res) => {
        // Récupération de l'id dans l'url (.params) et typage
        const id = parseInt(req.params.id)
        // Récupération du personnage selon l'id entré en paramètre
        const character = characters.find(c => c.id === id)
        // Envoi d'une erreur 404 si aucun personnage trouvé
        if(!character) {
            res.sendStatus(404)
            return
        }
        // Modification de l'objet
        const updatedCharacter = {
            ...character,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            serie: req.body.serie
        }
        // Vérification des modifications
        console.log(updatedCharacter)
        // Envoi d'un code de succès en réponse
        res.status(201).json(updatedCharacter)
    },

    // 9-5) La méthode delete
    delete: (req, res) => {
        // Récupération de l'id dans l'url (.params) et typage
        const id = parseInt(req.params.id)
        // Récupération de l'index de l'élément à supprimer selon l'id entré en paramètre
        const targetIndex = characters.findIndex(c => c.id === id)
        // Envoi d'une erreur 404 si l'élément n'existe pas
        if(targetIndex === -1) {
            res.sendStatus(404)
            return
        }
        // Ejection de l'élément ciblé
        characters.splice(targetIndex, 1)
        // Vérification de l'index et de l'élément ciblé ejecté
        console.log(targetIndex)
        // Envoi de la réponse "No-Content"
        res.sendStatus(204)
    }
}

// 10) Export du controller
module.exports = CharactersController
