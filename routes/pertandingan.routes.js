const express = require("express");
const {
  listMatch,
  detailMatch,
  addMatch,
  updateMatch,
  removeMatch,
} = require("../controllers/pertandingan.controller");
const jwtAuth = require("../middlewares/jwtAuth");

const router = express.Router();

router
  .get("/match", jwtAuth, listMatch)
  .get("/match/:id", jwtAuth, detailMatch)
  .post("/match", jwtAuth, addMatch)
  .put("/match/:id", jwtAuth, updateMatch)
  .delete("/match/:id", jwtAuth, removeMatch);

module.exports = router;
