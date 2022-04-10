exports.home = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
};
