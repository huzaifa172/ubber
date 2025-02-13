const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require("express-validator");

// register captain
module.exports.register = async (req, res , next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      let { firstName, lastName, email, password, phoneNumber, vehicleCapacity, vehicleType, vehiclePlate, vehicleModel, vehicleColor } = req.body;
      const captainExists = await captainModel.findOne({ email });
      if (captainExists) return res.status(400).json({ message: "Captain already exists" });
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
      const token = captain.generateAuthToken();
      res.cookie("token" , token , {expiresIn : "6days"})


      // response 
        res.status(201).json(captain);
    } catch (err) {
        res.status(400).send(err);
    }
};


// login captain
// logout captain
// profile captain 
// get all captains
