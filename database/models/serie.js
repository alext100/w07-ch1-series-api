const { Schema, model, Types } = require("mongoose");

const serieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  platform: {
    type: Types.ObjectId,
    ref: "Platform",
    required: true,
  },
});

const Serie = model("Serie", serieSchema);

module.exports = Serie;
