const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("getting list of questions");
});
router.post("/", (req, res, next) => {
  res.send("question created");
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
