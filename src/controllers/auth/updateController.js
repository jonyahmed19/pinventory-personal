const asyncHandler = require("express-async-handler");
const { findbyId } = require("../../helpers/helperquery");
const updateController = asyncHandler(async (req, res) => {
  const user = await findbyId(req.user._id);

  console.log("user ", user);

  if (user) {
    const { name, email, photo, phone, bio } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;
    const updatedUser = await user.save();

    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      phone: updatedUser.photo,
    });
  }
  res.status(404);
  throw new Error("User not found");
});

module.exports = updateController;
