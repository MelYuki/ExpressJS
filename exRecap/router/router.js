const HomeController = require("../controllers/home.controller")

const router = require("express").Router()

router.get("/", HomeController.index)
router.get("/contact", HomeController.contact_GET)
router.post("/contact", HomeController.contact_POST)

router.get("/product", HomeController.list_product)
router.get("/detail/:id", HomeController.detail_product)

// TODO:
// list, details, ...

module.exports = router