const http = require('http')
const app = require("./app")


const port = process.env.PORT || 5000
// db.on("error" , console.error.bind(console , "MongoDB Connection Error:"))



app.listen(port , ()=>{
  console.log("Alhumdulillah " + port);
  
})