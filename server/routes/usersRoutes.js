const express = require("express");
const { validate } = require("express-validation");
const {
  loginRequestSchema,
} = require("../../database/requestSchemas/loginRequestSchema");
const createUser = require("../middlewares/createUser");
const { validate } = require("express-validation");
const loginUser = require("../controller/userController");

const { loginRequestSchema } =
  "../../database/models/requestSchemas/loginUserSchema";

const router = express.Router();

router.post("/login", validate(loginRequestSchema), loginUser);

router.post("/register", validate(loginRequestSchema), createUser);

module.exports = router;
