const Platform = require("../../database/models/platform");

const getPlatform = async (req, res) => {
  const platform = await Platform.find();
  res.json(platform);
};

const createPlatform = async (req, res, next) => {
  try {
    const platform = req.body;
    const newPlatform = await Platform.create(platform);
    res.json(newPlatform);
  } catch (error) {
    error.code = 400;
    error.message = "Error on create new platform!";
    next(error);
  }
};

module.exports = { createPlatform, getPlatform };
