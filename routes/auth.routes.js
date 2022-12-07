const express = require("express");
const { register, login, reset } = require("../controllers/auth.controller.js");
const authValidation = require("../validations/auth.validation.js");
const runValidation = require("../middlewares/runValidation");
const { isVerified } = require("../middlewares/authorization");

const router = express.Router();

router
  .post("/auth/register", authValidation.register, runValidation, register)
  .post("/auth/login", authValidation.login, runValidation, login)
  .put("/auth/reset/:id", authValidation.reset, runValidation, reset);

module.exports = router;
