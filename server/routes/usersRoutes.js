const express = require("express");
const { validate } = require("express-validation");
const {
  loginRequestSchema,
} = require("../../database/requestSchemas/loginRequestSchema");
const createUser = require("../middlewares/createUser");

const router = express.Router();

router.post("/login");

router.post("/register", validate(loginRequestSchema), createUser);

module.exports = router;
