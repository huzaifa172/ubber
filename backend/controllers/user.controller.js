const { response } = require('express');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require("express-validator");
const blacklistTokenModel = require('../models/blacklist.token.model');


// register controller
module.exports.register = async (req, res, next) => {
  try{
    // validation 
    const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    // register user 
  const { firstName, lastName, email, password } = req.body;
  const userExists = await userModel.findOne({email})
  if(userExists) return res.status(400).json({message : "User already exists"})
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
    res.status(201).json({ user}
  );}catch(err){
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
    
      const user = await userModel.findOne({ email }).select('+password');
        
      if (!user) {
          return res.status(400).send('Invalid email or password.');
        }
        const isMatch = await userModel.comparePassword( user, password);
        if (!isMatch) {
          return res.status(400).send('Invalid email or password.');
        }
      

    // cookie send 
    const token = user.generateAuthToken();
    res.cookie("token" , token)
    
    
    // send response
    res.status(200).json("you logged in successfully ");
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