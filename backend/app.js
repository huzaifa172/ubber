const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors = require("cors")


const app = express()
// middlewares 
app.use(cors())



// routes 
app.get("/" , (req, res)=>{
  res.send("Alhumdulillah")
})

module.exports = app