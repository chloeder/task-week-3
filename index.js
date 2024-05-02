const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const hbs = require("hbs");

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

app.get("/edit-project/:id", editProjectView);
app.post("/edit-project", editProject);

app.post("/delete-project/:id", deleteProject);

app.get("/contact-form", contactForm);

const data = [];

// Utilities
function calculateDuration(startDate, endDate) {
  const timeDiff = Date.parse(endDate) - Date.parse(startDate);
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  const diffMonths = Math.floor(diffDays / 30.4167);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffYears > 0) {
    duration = `${diffYears} Years`;
  } else if (diffMonths > 0) {
    duration = `${diffMonths} Months`;
  } else {
    duration = `${diffDays} Days`;
  }

  return duration;
}

function dateFormat(date) {
  const newDate = new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return newDate;
}

// Services
function home(req, res) {
  // res.render("index");
  res.redirect("/project");
}

function project(req, res) {
  res.render("project", { data });
}

function addProjectView(req, res) {
  res.render("add-project");
}

function addProject(req, res) {
  const { projectName, startDate, endDate, description, technologies } =
    req.body;

  data.unshift({
    id: data.length + 1,
    projectName,
    startDate,
    endDate,
    duration: calculateDuration(startDate, endDate),
    description,
    technologies,
    file: "https://plus.unsplash.com/premium_photo-1688045530445-66a06a5e9ba6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });
  // console.log("add project", data);

  res.redirect("/project");
}

function editProjectView(req, res) {
  const { id } = req.params;

  const project = data.find((data) => data.id == id);
  // console.log(project);

  hbs.registerHelper("isChecked", function (value) {
    return project.technologies.includes(value) ? "checked" : "";
  });

  res.render("edit-project", project);
}

function editProject(req, res) {
  const { id, projectName, startDate, endDate, description, technologies } =
    req.body;

  const index = data.findIndex((data) => data.id == id);
  data[index] = {
    id,
    projectName,
    startDate,
    endDate,
    duration: calculateDuration(startDate, endDate),
    description,
    technologies,
    file: "https://plus.unsplash.com/premium_photo-1688045530445-66a06a5e9ba6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
  // console.log("edit project", data);
  res.redirect("/project");
}

function detailProject(req, res) {
  const { id } = req.params;

  const project = data.find((data) => data.id == id);

  hbs.registerHelper("dateFormat", function (value) {
    return dateFormat(value);
  });

  res.render("detail-project", project);
}

function deleteProject(req, res) {
  const { id } = req.params;

  const index = data.findIndex((data) => data.id == id);
  data.splice(index, 1);
  // console.log(index);

  res.redirect("/project");
}

function contactForm(req, res) {
  res.render("contact-form");
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
