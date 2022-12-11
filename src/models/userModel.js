const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must not be empty!"],
    },
    email: {
      type: String,
      required: [true, "Email must not be empty!"],
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email must be valid!",
      ],
    },
    password: {
      type: String,
      required: [true, "Password must not be empty!"],
      minLength: [6, "Password must be up to 6 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo!"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
    },
    bio: {
      type: String,
      maxLength: [250, "Bio must not be more than 150 characters!"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Encrypt password before saving
 */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(this.password, salt);
  this.password = hashed;
  next();
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
