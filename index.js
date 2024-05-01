const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

// setting variables, configurations, etc.
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

// body parser
app.use(express.urlencoded({ extended: false }));

// Middleware
app.use("/assets", express.static(path.join(__dirname, "./assets")));

// Routes
app.get("/", home);

app.get("/project", project);
app.get("/detail-project/:id", detailProject);

app.get("/add-project", addProjectView);
app.post("/add-project", addProject);

app.get("/contact-form", contactForm);

const data = [];

// Services
function home(req, res) {
  res.render("index");
}

function project(req, res) {
  res.render("project");
}

function addProjectView(req, res) {
  res.render("add-project");
}

function addProject(req, res) {
  console.log(req.body);
}

function detailProject(req, res) {
  res.render("detail-project");
}

function contactForm(req, res) {
  res.render("contact-form");
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
