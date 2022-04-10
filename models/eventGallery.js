const mongoose = require("mongoose")

const gallerySchema = new mongoose.Schema({
    title: String,
    thumbnail: String
})

module.exports = new mongoose.model('eventGallery', gallerySchema)