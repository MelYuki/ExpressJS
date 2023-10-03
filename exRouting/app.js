const express = require("express")
const app = express()

const port = 8001

app.get("/", (req, res) => {
    res.writeHead(200)
    res.end("Hello world")
})

app.get("/test", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    })
    res.end("<h1>Message OK</h1>")
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})