const express = require("express");
const {
  updateFormulir,
  updateDokumen,
  updateStatus,
} = require("../controllers/administrasi.controller");
const jwtAuth = require("../middlewares/jwtAuth");
const upload = require("../middlewares/upload");

const router = express.Router();

router
  .put("/administrasi/form/:id", jwtAuth, updateFormulir)
  .put("/administrasi/upload/:id", jwtAuth, upload, updateDokumen)
  .put("/administrasi/approve/:id", jwtAuth, updateStatus);
module.exports = router;
