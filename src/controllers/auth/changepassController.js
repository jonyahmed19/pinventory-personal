const asyncHandler = require("express-async-handler");
const { findbyId } = require("../../helpers/helperquery");
const bcrypt = require("bcryptjs");

const changepasswordController = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body || {};
  console.log("user", oldPassword);

  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  const user = await findbyId(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password change successful");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

module.exports = changepasswordController;
