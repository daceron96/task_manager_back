const express = require('express');
const router = express.Router();
const TaskController = require('../controllers');


router.get('/hello', TaskController.sayHello)

module.exports = router;