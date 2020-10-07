const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({

  day: {
    type: Date,
    default: () => new Date()
  },

    type: {
        type: String,
        trim: true,
        required: "Enter your exercise type"
      },

      name: {
        type: String,
        trim: true,
        required: "Enter your exercise name"
      },

      duration: {
        type: Number,
        required: "Enter your exercise duration in minutes"
      },

      distance: {
        type: Number
      },

      reps: {
        type: Number
      },
      
      sets: {
        type: Number
      },

      weight: {
        type: Number
      }

});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;