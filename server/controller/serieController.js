const Serie = require("../../database/models/serie");
const User = require("../../database/models/user");

const createSerie = async (req, res, next) => {
  try {
    const serie = req.body;
    const newSerie = await Serie.create(serie);
    res.json(newSerie);
  } catch (error) {
    error.code = 400;
    error.message = "Error on create new serie!";
    next(error);
  }
};

const updateSerie = async (req, res, next) => {
  const serie = req.body;
  try {
    const updatedSerie = await Serie.findByIdAndUpdate(serie.id, serie, {
      new: true,
    });
    if (updatedSerie) {
      res.json(updatedSerie);
    } else {
      const error = new Error("Serie not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Wrong id format";
    next(error);
  }
};

const deleteSerie = async (req, res, next) => {
  const { idSerie } = req.params;
  try {
    const serieToDelete = await Serie.findByIdAndDelete(idSerie);
    res.json(serieToDelete);
  } catch (error) {
    error.code = 500;
    error.message = "Error on delete serie!";
    next(error);
  }
};

const getSeries = async (req, res) => {
  const user = await User.findOne({ username: req.body.username }).populate(
    "serie"
  );
  res.json(user.serie);
};

module.exports = { createSerie, updateSerie, deleteSerie, getSeries };
