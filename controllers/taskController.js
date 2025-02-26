const Task = require("../models/taskModel");
const { validationResult } = require("express-validator");
const moment = require("moment");
const mongoose = require("mongoose");

const createTask = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
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
      data: {
        details: newTask,
      },
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
      data: {
        list: tasks,
      },
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
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
        });
      }
  
  
  try {
   
    const taskToUpdateID = req.params.id;

     // Check if the provided ID is a valid ObjectId
     if (!mongoose.Types.ObjectId.isValid(taskToUpdateID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID",
      });
    }

    // Extract data from request body
    const updatedTaskData = req.body;
   

    // Attempt to find and update the task by ID
    const taskToUpdate = await Task.findByIdAndUpdate(
      taskToUpdateID,
      updatedTaskData,
      {
        new: true, // Return the updated task
      }
    );  

    if (!taskToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Return the updated task details
    return res.status(201).json({
      success: true,
      message: "Task updated successfully",
      data: {
        updatedTask: taskToUpdate,
      },
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
    // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  try {

    const taskToDeleteID = req.params.id;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskToDeleteID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID format",
      });
    }

    // Attempt to find and delete the task by ID
    const taskToDelete = await Task.findByIdAndDelete(taskToDeleteID);
    if (!taskToDelete) {
      return res.status(404).json({
        success: false,
        message: "Task not found with the provided ID",
      });
    }
    return res.status(200).json({
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
