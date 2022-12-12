const User = require("../models/userModel");

const userExists = async (email) => {
  const check = await User.findOne({ email });

  return check;
};

module.exports = userExists;
