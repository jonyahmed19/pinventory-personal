const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const tokenSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      require: [true, "User should be definded!"],
      ref: "Users",
    },
    token: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const TokenModel = mongoose.model("Token", tokenSchema);

module.exports = TokenModel;
