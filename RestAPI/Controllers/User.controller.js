const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../Models/User.model");

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      let userDuplication = await User.findOne({ email: req.body.email });
      if (userDuplication) {
        return res.status(400).send("User already registered.");
      }

      const user = new User(req.body);
      const result = await user.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        return next(createError(422, error.message));
      }
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const user = new User(req.body);
      const result = await user.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        return next(createError(422, error.message));
      }
      next(error);
    }
  },
  findUserById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        throw createError(404, "User donot exists");
      }
      res.send(user);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid User id"));
      }
      next(error);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const options = { new: true };

      const result = await User.findByIdAndUpdate(id, update, options);
      if (!result) {
        throw createError(404, "User does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid User id"));
      } else {
        next(error);
      }
    }
  },
  /*
  getAllQuestions: async (req, res, next) => {
    try {
      const results = await Question.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  postAQuestion: async (req, res, next) => {
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
  },

  findQuestionById: async (req, res, next) => {
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
  },

  updateQuestionById: async (req, res, next) => {
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
  },*/
};
