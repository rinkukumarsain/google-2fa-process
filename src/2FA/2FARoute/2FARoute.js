let express = require("express");
let router = express.Router();
let auth = require("../../middelware/auth");
let {
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
} = require("../2FAController/2FAContoller");
router.get("/generatecode", auth, generatecode);
router.get("/phone", auth, phone);
router.post("/sendOtp", auth, sendOtp);
router.get("/otp", auth, otp);
router.post("/otpMatched", auth, otpMatched);
router.get("/factorAuth", auth, factorAuth);
router.post("/verfiedToken", auth, verfiedToken);
router.post("/verfiedTokenBeforeLoginPost",auth, verfiedTokenBeforeLoginPost);
router.get("/verfiedTokenBeforeLoginGet",auth, verfiedTokenBeforeLoginGet);
router.post("/disabledFA",auth, disabledFA);
router.get("/disableGetFa",auth, disableGetFa);
module.exports = router;
