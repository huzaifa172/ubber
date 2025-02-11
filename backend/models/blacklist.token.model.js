const mongoose = require("mongoose");

const blacklistTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }, 
    exp: {
        type: Date,
        default: Date.now, 
        expires: 86400 
    }
})

module.exports = mongoose.model("blacklistToken", blacklistTokenSchema);