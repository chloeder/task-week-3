const {
  findAllProjects,
  getProjectById,
  createProject,
  createProjectView,
  updateProjectView,
  updateProject,
  deleteProject,
} = require("../controller/projectsController");
const express = require("express");
const router = express.Router();

router.get("/", findAllProjects);
router.get("/project/:id", getProjectById);
router.get("/add-project", createProjectView);
router.post("/add-project", createProject);
router.get("/edit-project/:id", updateProjectView);
router.post("/edit-project", updateProject);
router.post("/delete-project/:id", deleteProject);

module.exports = router;
