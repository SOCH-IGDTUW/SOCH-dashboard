const passport = require("passport");
const Art = require("../models/art");

exports.art = (req, res) => {
  if (req.isAuthenticated()) {
    Art.find({}, function (err, arts) {
      if (!err) res.render("art", { arts: arts });
      else console.log(err);
    });
  } else {
    res.redirect("/login");
  }
};
exports.createArtGET = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("create-art");
  } else {
    res.redirect("/login");
  }
};
exports.deleteArt = (req, res) => {
  if (req.isAuthenticated()) {
    const artID = req.params.art_id;
    Art.deleteOne({ _id: artID }, function (err) {
      if (!err) res.redirect("/art");
      else console.log(err);
    });
  }
};
exports.createArtPOST = (req, res) => {
  const str = req.body.art;
  const url = str.substring(str.indexOf("/d/") + 3, str.lastIndexOf("/view"));
  const art = new Art({
    title: req.body.title,
    artist: req.body.artist,
    image: url,
  });
  art.save(function (err) {
    if (!err) res.redirect("/art");
    else console.log(err);
  });
};
