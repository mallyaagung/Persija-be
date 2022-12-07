require("dotenv").config();

module.exports = {
  // database
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  //app
  APP_NAME: process.env.APP_NAME,
  PORT: process.env.PORT,
  // jwt
  JWT_SECRET: process.env.JWT_SECRET,

  //google api
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  DRIVE_REFRESH_TOKEN: process.env.DRIVE_REFRESH_TOKEN,
  REDIRECT_URI: process.env.REDIRECT_URI,
};
