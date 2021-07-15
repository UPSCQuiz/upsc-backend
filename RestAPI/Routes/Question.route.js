const express = require("express");
const router = express.Router();
const Question = require("../Models/Question.model");

router.get("/", async (req, res, next) => {
  try {
    const results = await Question.find({}, { __v: 0 });
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const question = new Question(req.body);
    const result = await question.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:id", (req, res, next) => {
  res.send("getting question by id");
});
router.patch("/:id", (req, res, next) => {
  res.send("updating question by id");
});
router.delete("/:id", (req, res, next) => {
  res.send("deleting question by id");
});
module.exports = router;
