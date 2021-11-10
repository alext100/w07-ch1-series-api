const express = require("express");
const createSerie = require("../controller/serieController");
// const auth = require("../middlewares/auth");

const router = express.Router();

// router.get("/", getSeries);

// router.get("/viewed", getViewedSeries);

// router.get("/pending", getPendingSeries);

router.post("/", createSerie);

router.delete("/:idSerie");

router.put("/:idSerie");

router.patch("/view/:idSerie");

module.exports = router;
