const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const { PORT } = require("./utils/env");
const { failed } = require("./utils/createResponse");
const authRoute = require("./routes/auth.routes");
const matchRoute = require("./routes/pertandingan.routes");
const adminRoute = require("./routes/administrasi.routes");

// deklarasi express
const app = express();

app.use(helmet());
app.use(xss());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// root router
app.get("/", (req, res) => res.send(`Document Management API v1.0`));

// main router
app.use(authRoute);
app.use(matchRoute);
app.use(adminRoute);

// 404 router
app.use("*", (req, res) => {
  failed(res, {
    code: 404,
    payload: "Resource on that url not found",
    message: "Not Found",
  });
});

// running server
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server started`);
  console.log(`Visit http://localhost:${PORT}`);
  // console.log(req);
});
