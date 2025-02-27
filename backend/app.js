const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./db/db")
const cookieParser = require('cookie-parser');
const flash = require('connect-flash')
const expressSession = require('express-session')




// routes 
const mainRoutes = require("./routes/main.routes")
const userRoutes = require("./routes/user.routes")
const captainRoutes = require("./routes/captain.routes")

db()
// middlewares 
app.use(cookieParser());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



// routes 
app.use("/api" , mainRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/captain" , captainRoutes)


// exports 
module.exports = app