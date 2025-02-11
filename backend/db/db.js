const mongoose = require("mongoose")
const config = require("config")
const dbgr = require("debug")("development:mongoose")

function connectDB(){
  const db = process.env.MONGO_URI || config.get("MONGO_URI")
  mongoose.connect(db)
  .then(()=>{
    console.log("connected to the database");
  })
  .catch((err)=>{
    dbgr(err)
  })
}

module.exports = connectDB