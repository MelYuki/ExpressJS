const express = require("express")
const app = express()

const port = 8005

const middlewareApp = (req, res, next) => {
    const url = req.url
    const now = new Date().toLocaleDateString("fr-be")

    console.log(`Requête effectuée sur ${url} à ${now}`)
    next()
}
const middlewareRouter = (req, res, next) => {
    console.log(`Copain était ici...`)
    next()
}
const middlewareError = (error, req, res, next) => {
    console.log(`Traitement de l'erreur: `, error)

    if(res.headerSent) {
        return next(error)
    }

    res.status(500).send("<h1>Une erreur est survenue!</h1>")
}

app.use(middlewareApp)

const router = express.Router()

app.use(router)

router.get("/", (req, res) => {
    console.log("Route en cours d'utilisation")
    res.send("<h1>Hello world</h1>")
})

router.get("/copain", middlewareRouter, (req, res) => {
    console.log("Salut copain!")
    res.send("<h1>Hello copain</h1>")
})

router.get("/erreur", (req, res) => {
    console.log("Traitement...")
    throw new Error("CA VA PETER!")
})

app.use(middlewareError)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
