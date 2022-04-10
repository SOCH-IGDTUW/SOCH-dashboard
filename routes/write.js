const passport = require("passport");
const Post = require("../models/write");

exports.write = (req, res) => {
  if (req.isAuthenticated()) {
    Post.find({}, function (err, posts) {
      res.render("writing", {
        posts: posts,
      });
    });
  } else {
    res.redirect("/login");
  }
};
exports.createWriteGET = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("create-write");
  } else {
    res.redirect("/login");
  }
};
exports.deleteWrite = (req, res) => {
  if (req.isAuthenticated()) {
    const writeID = req.params.write_id;
    Post.deleteOne({ _id: writeID }, function (err) {
      if (!err) res.redirect("/writing");
      else console.log(err);
    });
  }
};
exports.viewPost = (req, res) => {
  const requestedPostId = req.params.postId;
  Post.findOne({ _id: requestedPostId }, function (err, post) {
    if (err) console.log(err);
    else {
      res.render("post", {
        title: post.title,
        content: post.content,
        author: post.author,
      });
    }
  });
};
exports.createWritePOST = (req, res) => {
  const str = req.body.post;
  const url = str.substring(str.indexOf("/d/") + 3, str.lastIndexOf("/view"));
  const post = new Post({
    title: req.body.title,
    content: url,
    author: req.body.author,
  });
  post.save(function (err) {
    if (!err) {
      res.redirect("/writing");
    }
  });
};
