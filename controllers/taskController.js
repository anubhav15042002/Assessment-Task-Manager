const Task = require("../models/taskModel");
const {validationResult} = require('express-validator');
const moment = require("moment");

const createTask = async (req, res) => {
     // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, taskGivenBy, taskGivenTo, status, dueDate } =
      req.body;

    // Setting time to midnight
    const normalizedDueDate = moment.utc(dueDate).startOf("day").toDate();

    const newTask = new Task({
      title,
      description,
      taskGivenBy,
      taskGivenTo,
      status,
      dueDate: normalizedDueDate,
    });

    await newTask.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      taskDetails: newTask,
    });
  } catch (error) {
    console.log("Error during Error Creation", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const { status, dueDate } = req.query;
    const filters = {};

    if (status) {
      filters.status = status;
    }

    if (dueDate) {
      // Setting the time to midnight
      const normalizedDueDate = moment.utc(dueDate).startOf("day").toDate();
      filters.dueDate = normalizedDueDate;
    }

    const tasks = await Task.find(filters);

    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: "Tasks not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tasks found successfully",
      taskList: tasks,
    });
  } catch (error) {
    console.log("Error fetching Tasks", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskToUpdateID = req.params.id;
    if (!taskToUpdateID) {
      return res.status(400).json({
        success: false,
        message: "ID not provided of the Task to update",
      });
    }
    const updatedTaskData = req.body;
    if (!updatedTaskData) {
      return res.status(400).json({
        success: false,
        message: "Provide the fields and data to update",
      });
    }

    const taskToUpdate = await Task.findByIdAndUpdate(
      taskToUpdateID,
      updatedTaskData,
      {
        new: true,
      }
    );

    if (!taskToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Task updated successfully",
      updatedTask: taskToUpdate,
    });
  } catch (error) {
    console.log("Error while updation", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskToDelete = await Task.findByIdAndDelete(req.params.id);
    if (!taskToDelete) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log("Error during deletion", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
