let speakeasy = require("speakeasy");
const QRCode = require("qrcode");
let registerModel = require("../../model/register");
let { mail, genrateotp } = require("../../helper/sendMail");
let nodemailer = require("nodemailer");
let bcrypt = require("bcryptjs");
const session = require("express-session");

let phone = async (req, res) => {
  res.render("phone");
};

let otp = async (req, res) => {
  res.render("otp");
};
let sendOtp = async (req, res) => {
  try {
    let checkUser = await registerModel.findOne({ email: req.body.email });
    let otpvalue = Math.floor(Math.random() * 89999 + 10000);
    //   console.log(otpvalue)
    if (checkUser) {
      mail(
        req.body.email,
        `otp`,
        genrateotp(`
        <h1>${otpvalue}</h1>
        `)
      );
      insertOtp = await registerModel.findByIdAndUpdate(
        { _id: checkUser._id },
        { otp: otpvalue, otpExpireTime: Date.now() + 50000 },
        { new: true }
      );
      req.session.otp = otpvalue;
      // console.log(req.session.otp,"sssssssssssssssssss")
      res.redirect("otp");
    } else {
      res.redirect("/phone");
    }
  } catch (e) {
    error(res, e, 400);
  }
};
let otpMatched = async (req, res) => {
  try {
    let arr = req.body.otp;
    let st = arr.toString();
    let str = st.split(",").join("");

    let data = await registerModel.findOne({ _id: req.session.data._id });
    if (req.session.otp == str) {
      res.render("authPermission", { FA: data.FA });
    } else {
      res.redirect("otp");
    }
  } catch (err) {
    console.log(err);
  }
};

let generatecode = async (req, res) => {
  let secret = speakeasy.generateSecret({
    name: process.env.NAME,
  });
  console.log(secret);
  let findData = await registerModel.findOne({ _id: req.session.data._id });
  if (findData) {
    QRCode.toDataURL(secret.otpauth_url, async function (err, url) {
      let update = await registerModel.findByIdAndUpdate(
        { _id: findData._id },
        { secret: secret, QRCodeUrl: url },
        { new: true }
      );
      if (update) {
        res.render("qrcode", { code: update.QRCodeUrl });
      }
    });
  }
};

let factorAuth = async (req, res) => {
  res.render("factorAuth");
};

let verfiedToken = async (req, res) => {
  let arr = req.body.otp;
  let st = arr.toString();
  let str = st.split(",").join("");
  let findData = await registerModel.findOne({ _id: req.session.data._id });
  let verfied = speakeasy.totp.verify({
    secret: findData.secret.ascii,
    encoding: "ascii",
    token: str,
  });
  console.log(verfied);
  if (verfied) {
    let update = await registerModel.findByIdAndUpdate(
      { _id: findData._id },
      { FA: 1 },
      { new: true }
    );
    res.redirect("/index");
  } else {
    console.log("token not matched");
  }
};

let verfiedTokenBeforeLoginGet = async (req, res) => {
  res.render("authBeforeLogin");
};
let verfiedTokenBeforeLoginPost = async (req, res) => {
  let arr = req.body.otp;
  let st = arr.toString();
  let str = st.split(",").join("");
  let findData = await registerModel.findOne({ _id: req.session.data._id });

  let verfied = speakeasy.totp.verify({
    secret: findData.secret.ascii,
    encoding: "ascii",
    token: str,
  });
  if (verfied) {
    res.redirect("/index");
  } else {
    res.redirect("/login");
  }
};

let disableGetFa = async (req, res) => {
  res.render("disableGetFa", { email: req.session.data.email });
};
let disabledFA = async (req, res) => {
  let checkEmail = await registerModel.findOne({ email: req.body.email });
  if (checkEmail) {
    let ismatch = await bcrypt.compare(req.body.password, checkEmail.password);
    if (ismatch) {
      let updateDisable = await registerModel.findByIdAndUpdate(
        { _id: checkEmail._id },
        { FA: 0 },
        { new: true }
      );
      res.redirect("index");
    } else {
      res.render("login", { err1: "wrong password" });
    }
  } else {
    res.render("login", { err: "invalid user" });
  }
};
module.exports = {
  generatecode,
  phone,
  sendOtp,
  otp,
  otpMatched,
  factorAuth,
  verfiedToken,
  verfiedTokenBeforeLoginPost,
  verfiedTokenBeforeLoginGet,
  disabledFA,
  disableGetFa,
};
