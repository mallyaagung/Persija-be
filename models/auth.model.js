const db = require("../config/db");

module.exports = {
  register: (body) =>
    new Promise((resolve, reject) => {
      const { id, username, name, password, phone, role } = body;

      db.query(
        "INSERT INTO users (id, username, name, password, phone, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [id, username, name, password, phone, role],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  login: (username) =>
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
  resetPassword: (id, password) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET password=$1 WHERE id=$2",
        [password, id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};
