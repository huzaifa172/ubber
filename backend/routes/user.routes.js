const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
const { authUser } = require('../middlewares/auth.middleware');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash')
const expressSession = require('express-session')




router.use(cookieParser());

// middlewares
router.use(
  expressSession({
    resave : false, 
    saveUninitialized : false, 
    secret : process.env.SESSION_SECRET,
  })
)
router.use(flash())

// routes 
router.get("/", (req, res) => {
  res.send("Alhumdulillah user routes working");
});

// register route
router.post("/register", [
  body('email').isEmail().withMessage("Please enter a valid email"),
  body('password').isLength({ min: 6 }).withMessage("Password should be at least 6 characters long"),
  body('firstName').isLength({ min: 3 }).withMessage("First Name should be at least 3 characters long"),
], userController.register);

// login route 
router.post("/login", [
  body('email').isEmail().withMessage("Please enter a valid email"),
  body('password').isLength({ min: 6 }).withMessage("Password should be at least 6 characters long"),
], userController.login);

// logout user
router.get("/logout", authUser,  userController.logout);

// user profile route 
router.get("/profile", authUser, userController.profile);

module.exports = router;