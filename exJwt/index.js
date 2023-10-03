const express = require("express")
const app = express()
const port = 8005

const UserRouter = require("./router/user.router")

app.use(express.json())
app.use(UserRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
