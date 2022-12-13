const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7days" });
};

exports.protected = asyncHandler(async (req, res, next) => {
  try {
    const tokenCookie = req.cookies?.token;

    if (!tokenCookie) {
      res.status(401);
      throw new Error("Not authorized, please login!");
    }
    const verified = jwt.verify(tokenCookie, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authrized, please login!");
  }
});
