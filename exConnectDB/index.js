const express = require("express")
const queries = require("./database")

const app = express()
const port = 8003

app.use(express.json())

app.get("/", queries.getAll)
app.get("/:id", queries.getUserById)
app.post("/", queries.addUser)
app.patch("/:id", queries.updateUser)
app.delete("/:id", queries.deleteUser)
// Ma méthode!
app.patch("/pwd/:id", queries.hashPwd)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
