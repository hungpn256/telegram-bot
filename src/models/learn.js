const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const learnSchema = new Schema({
    date: Number,
    classesStart: Number,
    numberOfLessons: Number,
    room: String,
    weeks: String,
    practice: Boolean
});

module.exports = mongoose.model('learn', learnSchema);