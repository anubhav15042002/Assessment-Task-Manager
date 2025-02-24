const express = require('express');
const {createTask, getTasks, updateTask, deleteTask} = require('../controllers/taskController');
const {validationChecks} = require ('../utils/validationChecks')

const router = express.Router();

router.post('/create', validationChecks ,createTask);
router.get('/get', getTasks);
router.put('/update/:id' , updateTask);
router.delete('/delete/:id' , deleteTask);

module.exports = router;