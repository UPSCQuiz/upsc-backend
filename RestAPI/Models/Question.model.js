const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  correct_answer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  posted_by: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  dislikes: {
    type: Number,
    required: true,
  },
});
const Question = mongoose.model("question", QuestionSchema);
module.exports = Question;
