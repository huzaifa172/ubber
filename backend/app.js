const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors = require("cors")
const db = require("./db/db")


// routes 
db()
const mainRoutes = require("./routes/main.routes")
const userRoutes = require("./routes/user.routes")
const captainRoutes = require("./routes/captain.routes")

const app = express()
// middlewares 


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



// routes 
app.use("/api" , mainRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/captains" , captainRoutes)


// exports 
module.exports = app