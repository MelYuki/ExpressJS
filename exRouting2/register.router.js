const express = require("express")
const RegisterController = require("./register.controller")

const router = express.Router()

router.post("/register", RegisterController.register)

module.exports = router
