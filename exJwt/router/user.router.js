const UserController = require("../controllers/user.controller")
const express = require("express")
const UserRouter = express.Router()

UserRouter.get("/list", UserController.getAll)
UserRouter.post("/login", UserController.login)
UserRouter.post("/register", UserController.register)
UserRouter.get("/protected", UserController.protected)

UserRouter.patch("/pwd/:id", UserController.hashPwd)

module.exports = UserRouter