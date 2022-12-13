const asyncHandler = require("express-async-handler");

const logOutController = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    message: "Successfully logged out!",
  });
});

module.exports = logOutController;
