const userModel = require("../models/user.model");
const { failed } = require("../utils/createResponse");

module.exports = {
  isAdmin: async (req, res, next) => {
    try {
      const user = await userModel.selectByUsername(req.body.username);

      if (!user.rowCount) {
        next();
      } else if (user.rows[0].role == "admin") {
        next();
      } else {
        failed(res, {
          code: 401,
          payload: "You are not admin",
          message: "Unauthorized",
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
};
