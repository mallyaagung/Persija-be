const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const { failed } = require("../utils/createResponse");

// management file
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "dokumen") {
        cb(null, "./document");
      }
    },
    filename: (req, file, cb) => {
      const name = crypto.randomBytes(30).toString("hex");
      const ext = path.extname(file.originalname);
      const filename = `${name}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "dokumen") {
      // filter mimetype
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb({ message: "You can only upload .pdf file!" }, false);
      }
    }
  },
  limits: { fileSize: 10000000 },
});

// middleware
module.exports = (req, res, next) => {
  const multerFields = multerUpload.fields([
    {
      name: "dokumen",
      maxCount: 1,
    },
  ]);
  multerFields(req, res, (err) => {
    if (err) {
      let errorMessage = err.message;
      if (err.code === "LIMIT_FILE_SIZE") {
        errorMessage = `File ${err.field} too large, max 10mb`;
      }

      failed(res, {
        code: 400,
        payload: errorMessage,
        message: "Upload File Error",
      });
    } else {
      next();
    }
  });
};
