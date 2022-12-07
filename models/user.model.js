const db = require("../config/db");

module.exports = {
  selectAll: (paging) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users LIMIT ${paging.limit} OFFSET ${paging.offset}`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  selectById: (id) =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE id=$1", [id], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
  selectByUsername: (username) =>
    new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE username=$1",
        [username],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updateById: (id, body) =>
    new Promise((resolve, reject) => {
      const { name, phone } = body;

      db.query(
        "UPDATE users SET name=$1, phone=$2 WHERE id=$3",
        [name, phone, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  removeById: (id) =>
    new Promise((resolve, reject) => {
      db.query("DELETE FROM users WHERE id=$1", [id], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
  countAll: () =>
    new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) FROM users", (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
};
