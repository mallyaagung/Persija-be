const db = require("../config/db");

module.exports = {
  selectFormById: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM administrasi WHERE id=$1",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updateAdministrasiById: (id, body) =>
    new Promise((resolve, reject) => {
      const { pic = "", comment = "" } = body;
      db.query(
        "UPDATE administrasi SET pic=$2, comment=$3 WHERE id=$4",
        [tanggal_upload, pic, comment, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  isApproved: (id, body) =>
    new Promise((resolve, reject) => {
      const { status } = body;
      db.query(
        "UPDATE administrasi SET status=$1 WHERE id=$2",
        [status, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updateFile: (id, body) =>
    new Promise((resolve, reject) => {
      const { tanggal_upload, dokumen } = body;
      db.query(
        "UPDATE administrasi set tanggal_upload=$1, dokumen=$2 where id=$3",
        [tanggal_upload, dokumen, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};
