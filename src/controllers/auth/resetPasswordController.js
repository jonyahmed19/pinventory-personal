const asyncHandler = require("express-async-handler");
const Token = require("../../models/tokenModel");
const User = require("../../models/userModel");
const crypto = require("crypto");
const resetPasswordController = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({
    message: "Password reset successful, please login",
  });
});

module.exports = resetPasswordController;
