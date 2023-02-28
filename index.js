require("dotenv").config();
let express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
let path = require("path");
let session = require("express-session");
app.use(
  session({
    secret:process.env.SessionSecreate,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  })
);
let viewpath = path.join(__dirname, "/src/views");
require("./src/dbConnection/connection");
let publicpath = path.join(__dirname, "/src/public");
app.use(express.static(publicpath));
app.set("view engine", "ejs");
app.set("views", viewpath);
const port = process.env.PORT;
let route = require("./src/register/registerRoute/registerRoute");
let FARoute = require("./src/2FA/2FARoute/2FARoute");
app.use(route);
app.use(FARoute);
app.listen(port, (err) => {
  if (!err) {
    console.log("server is running on the port number " + port);
  } else {
    console.log(err);
  }
});
