require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require("path");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const session = require("express-session");

// setting variables, configurations, etc.
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

// body parser
app.use(express.urlencoded({ extended: false }));

// Middleware
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 3600 * 24,
    },
  })
);

// Routes
app.use(indexRouter);
app.use(authRouter);

app.get("/", home);
app.get("/contact-form", contactForm);

// Services
function home(req, res) {
  // res.render("index");
  res.redirect("/project");
}

function contactForm(req, res) {
  const isLogin = req.session.isLogin;
  const findUser = req.session.findUser;
  res.render("contact-form", { isLogin, findUser });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
