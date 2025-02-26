const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      maxLength: 150,
    },
    taskGivenBy: {
      type: String,
      required: true,
      maxLength: 20,
    },
    taskGivenTo: {
      type: String,
      required: true,
      maxLength: 20,
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Not Completed"],
      required: true,
      maxLength: 20,
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
