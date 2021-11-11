const Platform = require("../../database/models/platform");

const getPlatform = async (req, res, next) => {
  try {
    const platform = await Platform.find();
    res.json(platform);
  } catch (error) {
    next(error);
  }
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

const deletePlatform = async (req, res, next) => {
  const { idPlatform } = req.params;
  try {
    const platform = await Platform.findByIdAndDelete(idPlatform);
    if (platform) {
      res.json({ id: idPlatform });
    } else {
      const error = new Error("Platform not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createPlatform, getPlatform, deletePlatform };
