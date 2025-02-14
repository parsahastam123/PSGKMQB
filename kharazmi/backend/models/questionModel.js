const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;