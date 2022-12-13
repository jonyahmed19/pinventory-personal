const User = require("../models/userModel");

exports.findbyEmail = async (email) => {
  const check = await User.findOne({ email });

  return check;
};

exports.findbyId = async (id) => {
  const check = await User.findById(id);
  return check;
};
