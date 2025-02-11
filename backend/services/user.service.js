const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !email || !password) throw new Error("Please provide all the fields");

  const user = await userModel.create({
    name: { firstName, lastName },
    email,
    password
  });
  return user;
};
