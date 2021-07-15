const express = require("express");
const router = express.Router();
const Question = require("../Models/Question.model");

router.get("/", (req, res, next) => {
  res.send("getting list of questions");
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
