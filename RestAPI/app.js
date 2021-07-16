const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");

const app = express();

app.use(express.json()); // middleware for post req Content-Type: application/json
mongoose
  .connect("mongodb+srv://cluster0.oj9le.mongodb.net/", {
    dbName: "UPSCAppDatabase",
    user: "sagarsuman1299",
    pass: "5hblB7BuJEegUtDj",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected");
  });

app.all("/test", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

const QuestionRoute = require("./Routes/Question.route");
app.use("/questions", QuestionRoute);

// wrong end point error handling
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
