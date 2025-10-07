import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path"

const app = express()
const parser = bodyParser.json()
const port = 3000
const __dirname = path.resolve()


app.use(cors({
    origin: "http://localhost:3000"
}))


// Route for the frontend
app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
})
// express.static('public')

// Defining a router for all the backend logic.
const api = express.Router()

api.post("/bmi" ,(req, res)=>{
    const body = req.body

    res.json({
        bmi : req.body.weight / (req.body.height * req.body.height) *10000
    })
})

// Adding the router routes to the main.
app.use("/api/v1", parser, api)

// Starting server
app.listen(port, ()=>{console.log(`Listening on port ${port}`)})