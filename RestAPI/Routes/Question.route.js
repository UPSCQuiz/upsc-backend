const express = require("express");
``;
const router = express.Router();
const QuestionController = require("../Controllers/Question.controller");

// find list of all questions
router.get("/", QuestionController.getAllQuestions);

// post a question
router.post("/", QuestionController.postAQuestion);

// get a question by id
router.get("/:id", QuestionController.findQuestionById);

// update a question by id
router.patch("/:id", QuestionController.updateQuestionById);

// delete the question by id
router.delete("/:id", QuestionController.deleteQuestionById);
module.exports = router;
