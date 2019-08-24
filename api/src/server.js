require("dotenv").config();

const express = require("express");
const parser = require("body-parser");
var cors = require("cors");

const passport = require("./utils/authentication/passport");
const routes = require("./routes");
const corsConfig = require("./utils/environment").corsConfig;

const app = express();

app.use(passport.initialize());
app.use(parser.json());
app.use(cors(corsConfig));

app.use("/", express.static("../PaginaPrincipal"));
app.use("/static", express.static("../aplicacion/build/static"));
app.use("/app", express.static("../aplicacion/build"));

app.use("/api", routes);

var server = app.listen(5000);

server.timeout = 10000;

console.log(`Server is listening at :${5000}`);
