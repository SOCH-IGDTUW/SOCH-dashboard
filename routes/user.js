const User = require("../models/user");
const passport = require("passport");

exports.loginGET = (req, res) => {
  res.render("login");
};
exports.registerGET = (req, res) => {
  res.render("register");
};
exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
exports.loginPOST = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    }
  });
};
exports.registerPOST = (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/home");
        });
      }
    }
  );
};
