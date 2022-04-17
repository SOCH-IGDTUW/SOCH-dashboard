const Event = require("../models/event");
const EventGallery = require("../models/eventGallery");

exports.event = (req, res) => {
  if (req.isAuthenticated()) {
    Event.find({}, function (err, events) {
      EventGallery.find({}, function(err2, gallery){
        if (!err && !err2) res.render("event", { events: events, posts: gallery});
        else console.log(err, err2);
      })
    });
  } else {
    res.redirect("/login");
  }
};
exports.createEventGET = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("create-event");
  } else {
    res.redirect("/login");
  }
};
exports.createEventGalleryGET = (req, res) => {
  if(req.isAuthenticated())
  {
    res.render("create-gallery");
  }
}
exports.deleteEvent = (req, res) => {
  if (req.isAuthenticated()) {
    const eventID = req.params.event_id;
    Event.deleteOne({ _id: eventID }, function (err) {
      if (!err) res.redirect("/event");
      else console.log(err);
    });
  }
};

exports.deleteEventGallery = (req, res) => {
  if(req.isAuthenticated())
  {
    const galleryID = req.params.event_id;
    EventGallery.deleteOne({_id: galleryID}, function(err){
      if (!err) res.redirect("/event");
      else console.log(err);
    })
  }
}

exports.createEventPOST = (req, res) => {
  if (req.isAuthenticated()) {
    const title = req.body.title;
    const desc = req.body.desc;
    const poster = req.body.poster;
    const url = poster.substring(
      poster.indexOf("/d/") + 3,
      poster.lastIndexOf("/view")
    );
    const fee = req.body.price;
    const venue = req.body.venue;
    const schedule = req.body.schedule;
    const link = req.body.form;
    const event = new Event({
      title: title,
      desc: desc,
      poster: url,
      fee: fee,
      venue: venue,
      schedule: schedule,
      link: link
    });
    event.save(function (err) {
      if (!err) res.redirect("/event");
      else console.log(err);
    });
  } else {
    res.redirect("/login");
  }
};

exports.createEventGalleryPOST = (req, res) => {
  if(res.isAuthenticated())
  {
    const title = req.body.title;
    const url = poster.substring(
      poster.indexOf("/d/") + 3,
      poster.lastIndexOf("/view")
    );
    const galleryPost = new EventGallery({
      title: title,
      thumbnail: url
    });
    galleryPost.save(function (err) {
      if (!err) res.redirect("/event");
      else console.log(err);
    });
  } else {
    res.redirect("/login");
  }
}
