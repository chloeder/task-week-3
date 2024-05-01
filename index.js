const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

// setting variables, configurations, etc.
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

// Middleware
app.use(express.static(path.join(__dirname, "./assets")));

// body parser
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", home);
app.get("/project", project);
app.post("/project", addProject);
app.get("/add-project", addProjectView);
app.get("/project/:id", detailProject);

const data = [];

// Services
function home(req, res) {
  res.render("index");
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

  const timeDiff = Date.parse(endDate) - Date.parse(startDate);
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  const diffMonths = Math.floor(diffDays / 30.4167);
  const diffYears = Math.floor(diffMonths / 12);

  let duration;

  if (diffYears > 0) {
    duration = `${diffYears} Years`;
  } else if (diffMonths > 0) {
    duration = `${diffMonths} Months`;
  } else {
    duration = `${diffDays} Days`;
  }

  data.unshift({
    id: data.length + 1,
    projectName,
    startDate,
    endDate,
    description,
    technologies,
    duration,
    file: "https://plus.unsplash.com/premium_photo-1688045530445-66a06a5e9ba6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });
  // console.log(data);
  res.redirect("/project");
}

function detailProject(req, res) {
  const { id } = req.params;
  console.log(id);
  const selectedProject = data.filter((project) => project.id == id);

  res.render("detail-project", { selectedProject });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
