const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const loginStatusController = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

module.exports = loginStatusController;
