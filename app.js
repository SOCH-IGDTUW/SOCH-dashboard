require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const multer = require("multer")

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'art-images');
  },
  filename: function(req, file, cb){
    cb(null, req.body.title);
  }
})

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const writeSchema = {
  title: String,
  content: String,
  author: String,
};
const artSchema = {

}
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
const Post = new mongoose.model("Post", writeSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
  res.redirect("/login");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/register", function (req, res) {
  res.render("register");
});
app.get("/home", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
});
app.get("/create-art", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("create-art");
  } else {
    res.redirect("/login");
  }
});
app.get("/art", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("art");
  } else {
    res.redirect("/login");
  }
});
app.get("/create-write", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("create-write");
  } else {
    res.redirect("/login");
  }
});
app.get("/writing", function (req, res) {
  if (req.isAuthenticated()) {
    Post.find({}, function (err, posts) {
      res.render("writing", {
        posts: posts,
      });
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  Post.findOne({ _id: requestedPostId }, function (err, post) {
    if (err) console.log(err);
    else {
      res.render("post", {
        title: post.title,
        content: post.content,
        author: post.author
      });
    }
  });
});
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});
app.post("/register", function (req, res) {
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
});
app.post("/login", function (req, res) {
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
});
app.post("/create-write", function (req, res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.post,
    author: req.body.author,
  });
  post.save(function (err) {
    if (!err) {
      res.redirect("/writing");
    }
  });
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});

// passport.use(User.createStrategy());
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// app.get("/", function (req, res) {
//   res.render("login");
// });
// app.get("/home", function (req, res) {
//   if (req.isAuthenticated()) {
//     res.render("home");
//   } else {
//     res.redirect("/login");
//   }
// });
// app.get("/login", function (req, res) {
//   res.render("login");
// });

// app.get("/register", function (req, res) {
//   res.render("register");
// });

// app.post("/register", function (req, res) {
//   User.register({ username: req.body.email }, req.body.password, function (err, user) {
//       if (err) {
//         console.log(err);
//         res.redirect("/register");
//       } else {
//         passport.authenticate("local")(req, res, function () {
//           res.redirect("/home");
//         });
//       }
//     }
//   );
// });
// app.post("/login", function (req, res) {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//   });
//   console.log(username, password);
//   req.login(user, function (err) {
//     if (err) {
//       console.log(err);
//       res.redirect("/login")
//     } else {
//       passport.authenticate("local"),
//         function (req, res) {
//           res.redirect("/home");
//         };
//     }
//   });
// });
