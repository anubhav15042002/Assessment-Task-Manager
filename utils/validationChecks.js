const { body, param } = require("express-validator");

const validationChecksCreate = [
 
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage("Title should not exceed 50 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .trim()
    .escape()
    .isLength({ max: 150 })
    .withMessage("Description should not exceed 150 characters"),

  body("taskGivenBy")
    .notEmpty()
    .withMessage("Task Given By Field is required")
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage("Task Given By Field should not exceed 20 characters"),

  body("taskGivenTo")
    .notEmpty()
    .withMessage("Task Given To Field is required")
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage("Task Given To Field should not exceed 20 characters"),

  body("status")
    .notEmpty()
    .withMessage("Status of the task is required")
    .isIn(["Completed", "In Progress", "Not Completed"])
    .withMessage(
      "Status must have only one out of these 3 values:- 'Completed' , 'In Progress' or 'Not Completed' "
    )
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage("Status should not exceed 20 characters"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due Date of the task is required")
    .isISO8601()
    .withMessage("Date Date must be a valid date in ISO format (YYYY-MM-DD).")
    .toDate(),
    
];



const validationChecksUpdate = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Task ID. Must be a valid MongoDB ObjectId."),

  // Optional fields: They are not required, but if they are provided, they must pass validation

  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty when provided")
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage("Title should not exceed 50 characters"),

  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty when provided")
    .trim()
    .escape()
    .isLength({ max: 150 })
    .withMessage("Description should not exceed 150 characters"),

  body("taskGivenBy")
    .optional()
    .notEmpty()
    .withMessage("Task Given By Field cannot be empty when provided")
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage("Task Given By Field should not exceed 20 characters"),

  body("taskGivenTo")
    .optional()
    .notEmpty()
    .withMessage("Task Given To Field cannot be empty when provided")
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage("Task Given To Field should not exceed 20 characters"),

  body("status")
    .optional()
    .isIn(["Completed", "In Progress", "Not Completed"])
    .withMessage(
      "Status must have only one out of these 3 values:- 'Completed' , 'In Progress' or 'Not Completed'"
    )
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage("Status should not exceed 20 characters"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due Date must be a valid date in ISO format (YYYY-MM-DD).")
    .toDate(),
];



const validationChecksDelete = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Task ID. Must be a valid MongoDB ObjectId."),
];


module.exports = { validationChecksCreate , validationChecksUpdate , validationChecksDelete };
