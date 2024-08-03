const express = require("express");
const app = express();
const path = require("node:path");

const indexRouter = require('./routes/index');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', indexRouter);

app.listen(8080);