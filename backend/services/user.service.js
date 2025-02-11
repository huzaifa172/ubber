const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstName, lastName, email, password }) => {

    try{  if (!firstName || !email || !password) throw new Error("Please provide all the fields");

  const user = await userModel.create({
    name: { firstName, lastName },
    email,
    password
  });
  return user;
}catch(err){
  console.log(err);
};}



// login user 
module.exports.loginUserByEmail = async (email) => {
  try{if (!email) throw new Error("Please provide email");
  const user = await userModel.findOne({ email });
    return user;
}catch(err){console.log(err);};}