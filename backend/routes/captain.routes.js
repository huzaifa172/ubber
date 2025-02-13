const express = require("express")
const router = express.Router() 
const captainController = require("../controllers/captain.controller")
const { body , validationResults } = require("express-validator")
const cookieParser = require('cookie-parser');


// middlewares 
router.use(cookieParser());

// main captain route 
router.get("/", (req, res) => {
  res.send("Alhumdulillah captain routes working");
});

// captain register route
router.post("/register", [
  body('email').isEmail().withMessage("Please enter a valid email"),
  body('password').isLength({ min: 6 }).withMessage("Password should be at least 6 characters long"),
  body('firstName').isLength({ min: 3 }).withMessage("First Name should be at least 3 characters long"),
  body('lastName').isLength({ min: 3 }).withMessage("Last Name should be at least 3 characters long"),
  body('phoneNumber').isLength({ min: 11 }).withMessage("Phone Number should be at least 11 characters long"),
  body('vehicleColor').isLength({ min: 3 }).withMessage("Color should be at least 3 characters long"),
  body('vehicleModel').isLength({ min: 3 }).withMessage("Model should be at least 3 characters long"),
  body('vehiclePlate').isLength({ min: 3 }).withMessage("Plate should be at least 3 characters long"),
  body('vehicleType').isIn(['bike', 'car', 'van', 'truck']).withMessage("Vehicle type should be bike, car, van or truck"),
  body('vehicleCapacity').isNumeric().withMessage("Capacity should be a number"),
], captainController.register);

// captain login route 
// captain logout route 
// captain profile route 








module.exports = router;