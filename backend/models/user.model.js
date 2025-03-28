const mongoose = require("mongoose"); 
const jwt = require("jsonwebtoken")
const bcrypt  = require("bcrypt")

const userSchema = mongoose.Schema({
  name: { 
    firstName :{
      type: String,
      required: true,
      minlength: [3 , "Your first Name should at least of 3 chracters or more"]
    },
    lastName :{
      type: String,
      minlength: [3 , "Your last Name should at least of 3 chracters or more"]
    }
   },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true  , select : false},
  role: { type: String, enum: ['user', 'rider'], default: 'user' },
  address: { type: String },
  phoneNumber: { type: String },
  socketId:{
    type: String , 
  }
})

userSchema.methods.generateAuthToken = function() {
  try {
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is missing in environment variables");
  }


    // Generate JWT token
    const token = jwt.sign(
      { _id: this._id, email: this.email}, // Include more details if needed
      process.env.SECRET_KEY,
      { expiresIn: "24h" } // Token expires in 24 hours
    );



  return token;
} catch (error) {
  console.error("Token Generation Error:", error.message);
  return null; // Return null if token generation fails
}
}

// userSchema.methods.comparePassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// }

// validation of password

userSchema.statics.comparePassword = async function (user, candidatePassword) {
  if (!user || !user.password) {
    throw new Error('User or hashed password is missing');
  }
  return await bcrypt.compare(candidatePassword, user.password);
};


// hasing password 

userSchema.statics.hashPassword = async function(password) {
  return bcrypt.hash(password, 10);
}

module.exports = mongoose.model("user" , userSchema);


