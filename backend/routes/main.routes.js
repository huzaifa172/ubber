const express = require("express")
const router = express.Router()


// the middlewares
// middlewares


// routes 
router.get("/" , (req , res)=>{
  res.send("Alhumdulillah")
})


// exports 
module.exports = router