const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.Now
   },

  type: {
    type: String,
    trim: true
   },

  name: {
    type: String,
    trim: true
    },

  duration: {
    type: Number,
  },

  weight: {
      type: Number
  },

  reps: {
      type: Number
  },

  sets: {
      type: Number
  }

});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;