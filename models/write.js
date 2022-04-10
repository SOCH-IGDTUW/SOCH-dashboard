const mongoose = require("mongoose")

const writeSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
});

module.exports = new mongoose.model("Post", writeSchema)