const express = require("express");
const app = express();

const QuestionRoute = require("./Routes/Question.route");
app.use("/questions", QuestionRoute);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
