const express = require("express");
const createPlatform = require("../controller/platformController");

const router = express.Router();

router.get("/");

router.post("/", createPlatform);

router.delete("/:idPlatform");

router.put("/:idPlatform");

module.exports = router;
