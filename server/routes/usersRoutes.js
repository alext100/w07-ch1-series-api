const express = require("express");
const { validate } = require("express-validation");
const {
  loginRequestSchema,
} = require("../../database/requestSchemas/loginRequestSchema");
const {
  registerRequestSchema,
} = require("../../database/requestSchemas/registerRequestSchema");
const createUser = require("../middlewares/createUser");
const loginUser = require("../controller/userController");

const router = express.Router();

router.post("/login", validate(loginRequestSchema), loginUser);

router.post("/register", validate(registerRequestSchema), createUser);

module.exports = router;
