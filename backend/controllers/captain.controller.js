const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require("express-validator");
const captainBlacklistTokenModel = require('../models/captain.blacklist.token');


// register captain
module.exports.register = async (req, res , next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      let { firstName, lastName, email, password, phoneNumber, vehicleCapacity, vehicleType, vehiclePlate, vehicleModel, vehicleColor } = req.body;
      const captainExists = await captainModel.findOne({ email });
      if (captainExists){
        req.flash("error", "Captain Already Exits");
        return res.status(400).json({ success: false, message: req.flash("error")[0] })
      }
      const hashPassword = await captainModel.hashPassword(password);
      const captain = await captainService.createCaptain({
        firstName,
        lastName,
        email,
        password : hashPassword,
        phoneNumber,
        vehicleCapacity,
        vehicleType,
        vehiclePlate,
        vehicleModel,
        vehicleColor
      })

      // send cookies 
      const tokenCaptain = captain.generateAuthToken();
      res.cookie("tokenCaptain" , tokenCaptain , {expiresIn : "6days"})


      // response 
        req.flash("success", "You Registered Successfully as Captain"); 
        res.status(200).json({ success: true, message: req.flash("success")[0] , tokenCaptain: tokenCaptain , captain : captain});
    } catch (err) {
        res.status(400).send(err);
    }
};

// login captain

module.exports.login = async (req, res, next) => {
  try {
    // validtaion 
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });
    // logging user 
    let { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
      req.flash("error", "invalid Email Or Password");
      return res.status(400).json({ success: false, message: req.flash("error")[0] })
    }
    const isMatch = await captainModel.comparePassword(captain, password);
    if (!isMatch) {
      req.flash("error", "invalid Email Or Password");
      return res.status(400).json({ success: false, message: req.flash("error")[0] })
    }

    // send cookies
    const tokenCaptain = captain.generateAuthToken();
    res.cookie("tokenCaptain", tokenCaptain, { expiresIn: "6days" });
    // response 

    req.flash("Success", "You are Logged in successfully");
    res.status(200).json({ success: true, message: req.flash("error")[0]  , tokenCaptain: tokenCaptain ,  captain : captain});
  } catch (err) {
    res.status(400).send(err);
  }
}
// logout captain
module.exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    await captainBlacklistTokenModel.create({tokenCaptain});
    res.status(200).send("Logged out successfully");
  } catch (err) {
    res.send(err.message);
  }
}
// profile captain 
// get all captains
