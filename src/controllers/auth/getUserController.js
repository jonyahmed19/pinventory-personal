const asyncHandler = require("express-async-handler");
const { findbyId } = require("../../helpers/helperquery");
const getUserController = asyncHandler(async (req, res) => {
  const user = await findbyId(req.user._id);

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

module.exports = getUserController;
