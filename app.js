const express = require("express");
const bodyParser = require("body-parser");

const routes = require(".\\routes\\route.js");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use("/", (req, res, next) => {
  res.status(404).send("page not found");
});
app.listen(3000);
