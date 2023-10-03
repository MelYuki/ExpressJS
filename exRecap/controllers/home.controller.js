const productsList = require("../datas/product.json")

const homeController = {
    index: (req, res) =>{
        // Récupération de la date actuelle
        const date = new Date()
        // transfo du format de la date
        const dateOfDay = date.toLocaleDateString("fr-be")

        const people = [
            {firstname: "Zaza", lastname: "Vanderquack"},
            {firstname: "Della", lastname: "Duck"},
            {firstname: "Balthazar", lastname: "Picsou"}
        ]

        res.render("home/index", {
            dateOfDay, people
        })
    },

    contact_GET: (req, res) => {
        res.render("contacts/contact", {
            data: {},
            errors: {}
        })
    },
    contact_POST: (req, res) => {
        const {pseudo, message} = req.body

        const pseudoNotValid = !pseudo || pseudo.length < 2
        const messageNotValid = !message

        console.log(pseudo, message)

        if (pseudoNotValid || messageNotValid) {
            res.render("contacts/contact", {
                errors: {
                    pseudo: pseudoNotValid,
                    message: messageNotValid
                },
                data: {
                    pseudo,
                    message
                }
            })
            return
        }

        console.log(`MESSAGE ${pseudo} : ${message}`)

        res.redirect("/")
    },
    list_product: (req, res) => {
        res.render("products/product", {products: productsList})
    },
    detail_product: (req, res) => {
        const {id} = req.params
        const idProduct = productsList.find(p => p.id === parseInt(id))

        res.render("details/detail", {detail: idProduct})
    }
}

module.exports = homeController
