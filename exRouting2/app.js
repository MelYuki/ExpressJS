const express = require("express")
const router = require("./register.router")

const app = express()

const port = 8003

app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})