let registerModel = require("../../model/register");
let bcrypt = require("bcryptjs");

let register = async (req, res) => {
  res.render("register");
};
let postRegister = async (req, res) => {
  try {
    console.log(req.body);
    let checkEmail = await registerModel.findOne({ email: req.body.email });
    if (!checkEmail) {
      let hash = await bcrypt.hash(req.body.password, 10);
      let data = new registerModel({
        email: req.body.email,
        username: req.body.username,
        password: hash,
      });
      let s = await data.save();
      res.redirect("/login");
    } else {
      res.render("login/register", { err: "Email Already Exists" });
    }
  } catch (e) {
    console.log(e);
  }
};
let login = async (req, res) => {
  res.render("login");
};
let postLogin = async (req, res) => {
  let checkEmail = await registerModel.findOne({ email: req.body.email });
  if (checkEmail) {
    let ismatch = await bcrypt.compare(req.body.password, checkEmail.password);
    if (ismatch) {
      req.session.data = checkEmail;
      if (checkEmail.FA === 1) {
        res.redirect("verfiedTokenBeforeLoginGet");
      } else {
        res.redirect("index");
      }
    } else {
      res.render("login", { err1: "wrong password" });
    }
  } else {
    res.render("login", { err: "invalid user" });
  }
};
let index = async (req, res) => {
  res.render("index");
};
let logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
module.exports = {
  register,
  login,
  postRegister,
  postLogin,
  index,
  logout,
};
