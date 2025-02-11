const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt =   require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklist.token.model');




module.exports.authUser = async (req , res , next)=>{
  try{
    // get token from cookies 
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message : "Unauthorized"})
    const blacklistedToken = await blacklistTokenModel.findOne({token});
    if(blacklistedToken) return res.status(401).json({message : "Unauthorized"})
    // verify token 
    const decoded = jwt.verify(token , process.env.SECRET_KEY);
    // find user 
    const user = await userModel.findById(decoded._id);
    if(!user) return res.status(404).json({message : "User not found"})
    req.user = user;
    next(); 
  }catch(err){
    console.log(err.message);
    if(err.message == "Cannot read properties of undefined (reading 'token')") return res.status(401).json({message : "Unauthorized"});
    res.status(500).json(err.message);
  }
}