const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: String,
    desc: String,
    venue: String,
    fee: Number,
    poster: String,
    schedule: String,
    link: String
})

module.exports = new mongoose.model('event', eventSchema)