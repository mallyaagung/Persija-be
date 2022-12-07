const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const authModel = require("../models/auth.model");
const userModel = require("../models/user.model");
const jwtToken = require("../utils/generateJWT");
const { failed, success } = require("../utils/createResponse");

module.exports = {
  register: async (req, res) => {
    try {
      const user = await userModel.selectByUsername(req.body.username);
      if (user.rowCount) {
        failed(res, {
          code: 409,
          payload: "Username already exist",
          message: "Register Failed",
        });
        return;
      }
      salt = bcrypt.genSaltSync(10);
      const password = await bcrypt.hash(req.body.password, salt);

      await authModel.register({
        id: uuidv4(),
        ...req.body,
        password: password,
      });

      success(res, {
        code: 201,
        payload: null,
        message: "Register Success",
      });
    } catch (error) {
      console.log(error);
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await authModel.login(username);

      // jika user ditemukan
      if (user.rowCount > 0) {
        const match = await bcrypt.compare(password, user.rows[0].password);
        // jika password benar
        if (match) {
          const jwt = await jwtToken({
            id: user.rows[0].id,
            role: user.rows[0].role,
          });
          success(res, {
            code: 200,
            payload: null,
            message: "Login Success",
            token: {
              jwt,
              id: user.rows[0].id,
              role: user.rows[0].role,
            },
          });
          return;
        }
      }

      failed(res, {
        code: 401,
        payload: "Wrong Username or Password",
        message: "Login Failed",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  reset: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.selectById(id);

      if (!user.rowCount) {
        failed(res, {
          code: 401,
          payload: "User not found!",
          message: "Reset Password Failed",
        });
        return;
      }

      const password = await bcrypt.hash(req.body.password, 10);
      await authModel.resetPassword(user.rows[0].id, password);

      success(res, {
        code: 200,
        payload: null,
        message: "Reset Password Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
};
