const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");

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
    if (error.name === "ValidationError") {
      return next(createError(422, error.message));
    }
    next(error);
  }
});

// get the question by id
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const question = await Question.findById(id);
    if (!question) {
      throw createError(404, "Question donot exists");
    }
    res.send(question);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid Product id"));
    }
    next(error);
  }
});

// update a question by id
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true };

    const result = await Question.findByIdAndUpdate(id, update, options);
    if (!result) {
      throw createError(404, "Product does not exist");
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid Product id"));
    } else {
      next(error);
    }
  }
});

// delete the question by id
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Question.findByIdAndDelete(id);
    if (!result) {
      throw createError(404, "Question donot exists");
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Product id"));
      return;
    }
    next(error);
  }
});
module.exports = router;
