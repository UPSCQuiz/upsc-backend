const { response } = require("express");
const express = require("express");
const router = express.Router();
const Question = require("../Models/Question.model");

// find list of questions
router.get("/", async (req, res, next) => {
  try {
    const results = await Question.find({}, { __v: 0 });
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
});

// post a question
router.post("/", async (req, res, next) => {
  try {
    const question = new Question(req.body);
    const result = await question.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

// get the question by id
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const question = await Question.findById(id);
    res.send(question);
  } catch (error) {
    console.log(error.message);
  }
});

// update a question by id
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true };
    const result = await Question.findByIdAndUpdate(id, update, options);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

// delete the question by id
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Question.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
