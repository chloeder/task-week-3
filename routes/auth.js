const {
  loginView,
  login,
  registerView,
  register,
  logout,
} = require("../controller/authController");
const express = require("express");
const router = express.Router();

router.get("/login", loginView);
router.post("/login", login);
router.get("/register", registerView);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
