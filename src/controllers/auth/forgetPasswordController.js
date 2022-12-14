const asyncHandler = require("express-async-handler");
const { findbyEmail } = require("../../helpers/helperquery");
const Token = require("../../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail");
const forgetPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please add email to forget password");
  }

  const user = await findbyEmail(email);

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  const token = await Token.findOne({ userId: user._id });

  if (token) {
    await token.deleteOne();
  }
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000),
  }).save();

  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `
  <h2>Hello ${user.name}</h2>
  <p>Please use the url below to reset your password</p>
  <p>This reset link is valid for only 30minutes.</p>
  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  <p>Regards...</p>
  <p>Pinvent Teamp>
  `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({
      success: true,
      message: "Reset Email Sent",
    });
  } catch (err) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

module.exports = forgetPasswordController;
