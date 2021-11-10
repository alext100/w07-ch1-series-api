const { Schema, model } = require("mongoose");

const platformSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const Platform = model("Platform", platformSchema);

module.exports = Platform;
