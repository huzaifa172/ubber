const mongoose = require("mongoose");

const captainBlacklistTokenSchema = mongoose.Schema({
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

module.exports = mongoose.model("captainBlacklistToken", captainBlacklistTokenSchema);
