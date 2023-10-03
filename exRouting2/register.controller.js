const bcrypt = require("bcrypt")
const RegisterModel = require("./register.model")

const RegisterController = {
    register : async (req, res) => {
        const {email, password, username, age} = req.body

        try {
            const hashedPassword = bcrypt.hashSync(password, 10)
            // console.log(hashedPassword)

            const newUser = RegisterModel.register({
                email,
                hashedPassword,
                username,
                age})

            if(newUser) {
                res.status(200).send(newUser)
            }
        }
        catch(error) {
            console.error(error)
            res.status(500).send("Server error")
        }
    }
}

module.exports = RegisterController