const express = require("express");
const {
  list,
  detail,
  update,
  remove,
} = require("../controllers/user.controller");
const userValidation = require("../validations/user.validation");
const runValidation = require("../middlewares/runValidation");
const jwtAuth = require("../middlewares/jwtAuth");

const router = express.Router();

router
  .get("/user", jwtAuth, list)
  .get("/user/:id", jwtAuth, detail)
  .put("/user/:id", jwtAuth, userValidation.update, runValidation, update)
  .delete("/user/:id", jwtAuth, remove);

module.exports = router;
