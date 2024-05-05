const config = require("../config/config.json");
const hbs = require("hbs");
const { Sequelize, QueryTypes, where } = require("sequelize");
const {
  calculateDuration,
  dateFormat,
  diffForHumans,
} = require("../utils/dateTimeCalculation");
const sequelize = new Sequelize(config.development);
const { Project, User } = require("../models");

// Fetch all projects
async function findAllProjects(req, res) {
  try {
    // Using query raw ----
    const query = `SELECT public."Projects".id, public."Projects"."projectName", public."Projects"."startDate", public."Projects"."endDate", public."Projects".description, public."Projects".technologies, public."Projects".image, public."Projects"."createdAt", public."Users".name FROM public."Users" JOIN public."Projects" ON public."Users".id = public."Projects"."userId";`;
    const data = await sequelize.query(query, { type: QueryTypes.SELECT });

    // Using model query ----
    // const data = await Project.findAll({
    //   includes: [
    //     {
    //       model: User,
    //     },
    //   ],
    // });

    const isLogin = req.session.isLogin;
    const findUser = req.session.findUser;

    hbs.registerHelper("calculateDuration", function (startDate, endDate) {
      return calculateDuration(startDate, endDate);
    });

    hbs.registerHelper("diffForHumans", function (date) {
      return diffForHumans(date);
    });

    // res.status(200).json({ data });
    res.render("project", { data, isLogin, findUser });
  } catch (error) {
    console.log(error, "<<<< error get projects");
  }
}

// Fetch project by id
async function getProjectById(req, res) {
  try {
    const { id } = req.params;

    // Using query raw ----
    // const query = `SELECT * FROM projects WHERE id=${id}`;
    // const data = await sequelize.query(query, {
    //   type: QueryTypes.SELECT,
    // });

    // Using model query ----
    const data = await Project.findByPk(id);

    hbs.registerHelper("dateFormat", function (value) {
      return dateFormat(value);
    });
    // res.json(data);
    res.render("detail-project", { data });
  } catch (error) {
    console.log(error, "<<<< error get project by id");
  }
}

// Add new project view
function createProjectView(req, res) {
  if (req.session.isLogin) {
    const isLogin = req.session.isLogin;
    const findUser = req.session.findUser;
    res.render("add-project", { isLogin, findUser });
  } else {
    res.redirect("/login");
  }
}

// Add new project logic
async function createProject(req, res) {
  try {
    const { projectName, startDate, endDate, description, technologies } =
      req.body;

    // Using query raw ----
    // const query = `INSERT INTO projects(name, "startDate", "endDate", description, technologies, image, "createdAt", "updatedAt") VALUES ('${projectName}', '${startDate}', '${endDate}', '${description}', '{${technologies}}', 'https://www.pwc.com/content/dam/pwc/cz/cs/technology-consulting/kariera/hero_telekomunikace.jpg', now(), now());`;
    // const data = await sequelize.query(query, {
    //   type: QueryTypes.INSERT,
    // });

    // Upload image
    const image = req.file.path;

    // Using model query ----
    const data = await Project.create({
      projectName,
      startDate,
      endDate,
      description,
      technologies,
      image,
      userId: req.session.findUser.id,
    });
    console.log(data, "<<< create data project");
    res.redirect("/");
  } catch (error) {
    console.log(error, "<<< error create data project");
  }
}

// Edit project view
async function updateProjectView(req, res) {
  try {
    const { id } = req.params;

    // Using query raw ---
    // const query = `SELECT * FROM projects WHERE id=${id}`;
    // const data = await sequelize.query(query, {
    //   type: QueryTypes.SELECT,
    // });

    // Using model query ---
    const data = await Project.findByPk(id);

    // Custom Helper for checkbox
    hbs.registerHelper("isChecked", function (value) {
      return data.technologies.includes(value) ? "checked" : "";
    });

    res.render("edit-project", { data });
  } catch (error) {
    console.log(error, "<<<< error view edit project");
  }
}

// Edit project logic
async function updateProject(req, res) {
  try {
    const { id, projectName, startDate, endDate, description, technologies } =
      req.body;

    // Using query raw ---
    // const query = `UPDATE projects SET name = '${projectName}', "startDate" = '${startDate}', "endDate" = '${endDate}', description = '${description}', technologies = '{${technologies}}' WHERE id = ${id}`;
    // const data = await sequelize.query(query, {
    //   type: QueryTypes.UPDATE,
    // });

    // Using model query
    const data = await Project.update(
      {
        projectName,
        startDate,
        endDate,
        description,
        technologies,
        image:
          "https://www.pwc.com/content/dam/pwc/cz/cs/technology-consulting/kariera/hero_telekomunikace.jpg",
      },
      {
        where: {
          id,
        },
      }
    );

    res.redirect("/");
  } catch (error) {
    console.log(error, "<<<< error edit project");
  }
}

// Delete project
async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    // Using query raw ---
    // const query = `DELETE FROM projects WHERE id=${id}`;
    // const data = await sequelize.query(query, {
    //   type: QueryTypes.DELETE,
    // });

    // Using model query ---
    const data = await Project.destroy({
      where: {
        id,
      },
    });

    res.redirect("/");
  } catch (error) {
    console.log(error, "<<<< error delete project");
  }
}

module.exports = {
  findAllProjects,
  getProjectById,
  createProject,
  createProjectView,
  updateProjectView,
  updateProject,
  deleteProject,
};
