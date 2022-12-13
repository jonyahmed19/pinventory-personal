const asyncHandler = require("express-async-handler");
const { generateToken } = require("../../helpers/token");
const { findbyEmail } = require("../../helpers/helperquery");
const bcrypt = require("bcryptjs");

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  const user = await findbyEmail(email);

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  const passwordCheck = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });
  if (user && passwordCheck) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

module.exports = loginController;
