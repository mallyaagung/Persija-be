const { check } = require("express-validator");

const register = [
  // name
  check("name", "Name required").not().isEmpty(),
  check("name", "Name only can contains alphabet").isAlpha("en-US", {
    ignore: " ",
  }),
  check("name", "Name maximum length is 50 characters").isLength({ max: 50 }),
  // username
  check("username", "Username required").not().isEmpty(),
  check("username", "Username maximum length is 50 characters").isLength({
    max: 50,
  }),
  // password
  check("password", "Password require 8 or more characters").isLength({
    min: 8,
  }),
  check(
    "password",
    "Password minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
  ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "i"),
  check("password", "Password can't above 100 characters").isLength({
    max: 100,
  }),
];

const login = [
  // username
  check("username", "Username required").not().isEmpty(),
  // password
  check("password", "Password required").not().isEmpty(),
];
const reset = [
  // password
  check("password", "Password require 8 or more characters").isLength({
    min: 8,
  }),
  check(
    "password",
    "Password must include one lowercase character, one uppercase character, a number, and a special character"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  check("password", "Password can't above 100 characters").isLength({
    max: 100,
  }),
];

module.exports = {
  register,
  login,
  reset,
};
