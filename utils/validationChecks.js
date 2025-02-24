const{body} = require('express-validator');

const validationChecks = [

    body("title")
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .escape(),

    body("description")
    .notEmpty()
    .withMessage("Description is required")
    .trim()
    .escape(),

    body("taskGivenBy")
    .notEmpty()
    .withMessage("Task Given By Field is required")
    .trim()
    .escape(),

    body("taskGivenTo")
    .notEmpty()
    .withMessage("Task Given To Field is required")
    .trim()
    .escape(),

    body("status")
    .notEmpty()
    .withMessage("Status of the task is required")
    .isIn(["Completed", "In Progress", "Not Completed"])
    .withMessage("Status must have only one out of these 3 values:-  'Completed' , 'In Progress' or 'Not Completed' ")
    .trim()
    .escape(),

    body("dueDate")
    .notEmpty()
    .withMessage("Due Date of the task is required")
    .isISO8601()
    .withMessage(
        "Date Date must be a valid date in ISO format (YYYY-MM-DD)."
      )
      .toDate(),
    
]

module.exports = {validationChecks};