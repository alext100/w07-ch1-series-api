const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  serie: {
    type: [Types.ObjectId],
    ref: "Serie",
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);

module.exports = User;
