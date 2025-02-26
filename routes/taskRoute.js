const express = require('express');
const {createTask, getTasks, updateTask, deleteTask} = require('../controllers/taskController');
const {validationChecksCreate , validationChecksUpdate , validationChecksDelete} = require ('../utils/validationChecks')

const router = express.Router();

router.post('/create', validationChecksCreate ,createTask);
router.get('/get', getTasks);
router.put('/update/:id' , validationChecksUpdate , updateTask);
router.delete('/delete/:id' , validationChecksDelete ,  deleteTask);

module.exports = router;