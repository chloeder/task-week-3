const bcrypt = require("bcrypt");
const { User } = require("../models");
const { where } = require("sequelize");

function loginView(req, res) {
  res.render("login");
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({
      where: {
        email,
      },
    });

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!findUser || !isPasswordValid) {
      return res.redirect("/login");
    }

    req.session.isLogin = true;
    req.session.findUser = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
    };

    res.redirect("/");
  } catch (error) {
    console.log(error, "<<< error login");
  }
}

function registerView(req, res) {
  res.render("register");
}

async function register(req, res) {
  const { name, email, password } = req.body;

  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);

  await User.create({
    name,
    email,
    password: hashPassword,
  });
  res.redirect("/login");
}

async function logout(req, res) {
  try {
    req.session.destroy(function (err) {
      if (err) return console.error("Logout failed!");

      console.log("Logout success!");
      res.redirect("/login");
    });
  } catch (error) {
    console.log(error, "<<< error logout");
  }
}

module.exports = { loginView, login, registerView, register, logout };
