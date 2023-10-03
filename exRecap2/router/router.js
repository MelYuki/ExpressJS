// Import express et middleware Router()
const express = require("express")
const router = express.Router()
// Import controller
const UserController = require("../controllers/controller")

// Routing
router.get("/admin", UserController.getAll) // Pour vérifier que le routing est ok.
router.get("/", UserController.login_get)
router.get("/register", UserController.register_get)
router.post("/register", UserController.register_post)

// Export router
module.exports = router