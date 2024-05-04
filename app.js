const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const hbs = require("hbs");
const config = require("./config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);
const indexRouter = require("./routes/index");

// setting variables, configurations, etc.
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

// body parser
app.use(express.urlencoded({ extended: false }));

// Middleware
app.use("/assets", express.static(path.join(__dirname, "./assets")));

// Routes
app.use(indexRouter);

app.get("/", home);

// Services
function home(req, res) {
  // res.render("index");
  res.redirect("/project");
}

function contactForm(req, res) {
  res.render("contact-form");
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
