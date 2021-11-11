const express = require("express");
const { validate } = require("express-validation");
const {
  platformRequestSchema,
} = require("../../database/requestSchemas/platformRequestSchema");
const {
  createPlatform,
  getPlatform,
  deletePlatform,
} = require("../controller/platformController");

const router = express.Router();

router.get("/", getPlatform);

router.post("/", validate(platformRequestSchema), createPlatform);

router.delete("/:idPlatform", deletePlatform);

router.put("/:idPlatform");

module.exports = router;
