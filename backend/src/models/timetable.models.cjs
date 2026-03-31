const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    
    dayOfWeek: {
      type: Number, // 0 = Sunday, 1 = Monday...
    },

    specificDate: {
      type: Date,
    },

    title: {
      type: String,
      required: true,
    },

    startTime: {
      type: String, 
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    isRecurring: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);