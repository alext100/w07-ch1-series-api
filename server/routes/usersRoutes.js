const express = require("express");
const { validate } = require("express-validation");
const loginUser = require("../controller/userController");

const { loginRequestSchema } =
  "../../database/models/requestSchemas/loginUserSchema";

const router = express.Router();

router.post("/login", validate(loginRequestSchema), loginUser);

router.post("/register");

module.exports = router;
