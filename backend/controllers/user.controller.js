const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require("express-validator");
const blacklistTokenModel = require('../models/blacklist.token.model');
const flash = require('connect-flash');
const expressSession = require('express-session');

// middle ware 

// register controller
module.exports.register = async (req, res, next) => {
  try{
    // validation 
    const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    // register user 
  const { firstName, lastName, email, password } = req.body;
  const userExists = await userModel.findOne({email})
  if (userExists){

    req.flash("error", "User already exists");
    return res.status(400).json({ success: false, message: req.flash("error")[0] })
  }
  
    const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstName,
    lastName,
    email,
    password: hashPassword
  });

  // send cookies 
  const token = user.generateAuthToken();
  res.cookie("token" , token , {expiresIn : "6days"})

    // send response
    req.flash("success", "Login successful!"); 
    res.status(200).json({ success: true, message: req.flash("success")[0] , token: token });
  }catch(err){
   console.log(err);
   
  }
};


// login controller
module.exports.login = async (req, res, next) => {
try {
  // validation 
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });
    
    // login user 
    let { email, password } = req.body;
    // console.log(password , email );
    
    // Check if email & password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }


      const user = await userModel.findOne({ email }).select('+password');
        
      if (!user) {
        
        req.flash("error", "invalid UserName or Password ");
        return res.status(400).json({ success: false, message: req.flash("error")[0] })
        }
        const isMatch = await userModel.comparePassword( user, password);
        if (!isMatch) {
        req.flash("error", "invalid UserName or Password ");
        return res.status(400).json({ success: false, message: req.flash("error")[0] })
        }
      

    // cookie send 
    const token = user.generateAuthToken();
    console.log("Generated Token:", token);
    res.cookie("token" , token ,{
      httpOnly: true,  // Prevent JavaScript access to the cookie
      sameSite: "strict" // Prevent CSRF attacks
    });
    
    
    // send response
    req.flash("error", "You are Logged in successfully");
    return res.status(200).json({ success: true, message: req.flash("error")[0]  , token: token})
} catch (error) {
  console.log(error.message);}}


// profile controller
module.exports.profile =  async (req , res)=>{
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);}
}


// logout controller 
module.exports.logout = async (req , res)=>{
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blacklistTokenModel.create({token});
    res.status(200).json("you logged out successfully");
  } catch (error) {
    console.log(error.message);}}