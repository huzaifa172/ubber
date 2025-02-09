const mongoose = require("mongoose")
const config = require("config")
const dbgr = require("debug")("development:mongoose")

mongoose.connect(`${config.get("MONGO_URI")}/ubber`)
  .then(() => {
    dbgr('DB Connected');
  })
  .catch((err) => {
    dbgr('DB Connection Error:', err);
  });


module.exports = mongoose.connection