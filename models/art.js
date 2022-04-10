const mongoose = require("mongoose")

const artSchema = new mongoose.Schema({
    title: String,
    artist: String,
    image: String
});

module.exports = new mongoose.model("art", artSchema)