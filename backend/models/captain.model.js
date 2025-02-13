const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const captainSchema = mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "Your first Name should at least of 3 chracters or more"],
    },
    lastName: {
      type: String,
      minlength: [3, "Your last Name should at least of 3 chracters or more"],
    },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phoneNumber: { type: String },
  socketId: {
    type: String,
  },
  vehicle: {
    color: { 
      type: String,  
      required : true 

    },
    model: { 
      type: String, 
      required : true
    },
    plate: { 
      type: String ,
      required : true 
    },
    type: { 
      type: String,
      required : true,
      enum: ['bike', 'car', 'van', 'truck'],
    }, 
    capacity : {
      type: Number,
      required : true
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  }, 
  location: {
    lat: { type: Number },
    lng: { type: Number },}
});



captainSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id },
    process.env.SECRET_KEY,
    { expiresIn: '24h' } // Set token to expire in 24 hours
  );
  return token;
}


captainSchema.statics.comparePassword = async function (user, candidatePassword) {
  if (!user || !user.password) {
    throw new Error('User or hashed password is missing');
  }
  return await bcrypt.compare(candidatePassword, user.password);
};



// hashing passwords 

captainSchema.statics.hashPassword = async function(password) {
  return bcrypt.hash(password, 10);
}



// exports 
module.exports = mongoose.model("captain", captainSchema);    