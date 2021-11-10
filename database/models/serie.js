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
  date: {
    type: Date,
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
    required: true,
  },
  platform: {
    type: Types.ObjectId,
    ref: "Platform",
  },
});

const Serie = model("Serie", serieSchema);

module.exports = Serie;
