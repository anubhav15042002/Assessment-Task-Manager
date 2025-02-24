const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    taskGivenBy: {
      type: String,
      required: true,
    },
    taskGivenTo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Not Completed"],
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
