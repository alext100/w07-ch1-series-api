const Platform = require("../../database/models/platform");
const Serie = require("../../database/models/serie");

const createSerie = async (req, res, next) => {
  try {
    const serie = req.body;
    // const platform = await Platform.findOne(serie.platform);
    const newSerie = await Serie.create(serie);
    res.json(newSerie);
  } catch (error) {
    error.code = 400;
    error.message = "Error on create new serie!";
    next(error);
  }
};

module.exports = createSerie;
