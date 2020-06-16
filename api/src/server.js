require("dotenv").config();

const express = require("express");
const parser = require("body-parser");
var cors = require("cors");

const passport = require("./utils/authentication/passport");
const routes = require("./routes");
const corsConfig = require("./utils/environment").corsConfig;

const app = express();

app.use(passport.initialize());
app.use(parser.json({ limit: "5mb" }));
app.use(
  parser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 5000,
  })
);
app.use(cors(corsConfig));

app.use("/", express.static("../PaginaPrincipal"));
app.use("/static", express.static("../aplicacion/build/static"));
app.use("/public", express.static("./public"));
app.use("/app", express.static("../aplicacion/build/"));

app.use("/api", routes);

var server = app.listen(25841);

server.timeout = 10000;

console.log(`Server is listening at :${25841}`);
