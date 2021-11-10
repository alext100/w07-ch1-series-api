const express = require("express");
const createUser = require("../middlewares/createUser");

const router = express.Router();

router.post("/login");

router.post("/register", createUser);

module.exports = router;
