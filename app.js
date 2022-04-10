require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user")
const main = require("./routes/main")
const user = require("./routes/user")
const art = require("./routes/art")
const write = require("./routes/write")
const events = require("./routes/events")

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

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// get routes
app.get("/", user.loginGET);
app.get("/login", user.loginGET);
app.get("/register", user.registerGET);
app.get("/home", main.home);
app.get("/create-art", art.createArtGET);
app.get("/art", art.art);
app.get("/create-write", write.createWriteGET);
app.get("/writing", write.write);
app.get("/event", events.event);
app.get("/create-event", events.createEventGET);
app.get("/create-event-gallery", events.createEventGalleryGET);
app.get("/posts/:postId", write.viewPost);
app.get("/delete/:art_id", art.deleteArt);
app.get("/delete-post/:write_id", write.deleteWrite);
app.get("/delete-event/:event_id", events.deleteEvent);
app.get("/delete-event-gallery/:event_id", events.deleteEventGallery);
app.get("/logout", user.logout);

// post routes
app.post("/register",user.registerPOST);
app.post("/login", user.loginPOST);
app.post("/create-art", art.createArtPOST)
app.post("/create-write", write.createWritePOST);
app.post("/create-event", events.createEventPOST);
app.post("/create-event-gallery", events.createEventGalleryPOST);

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started");
});