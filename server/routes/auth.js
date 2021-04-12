const express = require('express');
const router = express.Router();
const auth = require('../api/auth');
const Employee = require('../models/employee');
const Role = require('../models/role');
const User = require('../models/user');

router.post('/auth', auth.loginEmployee(Employee, Role));

router.post('/registration', auth.signupEmployee(Employee, Role));

router.post('/auth-user', auth.loginUser(User));

router.post('/registration-user', auth.signupUser(User));

module.exports = router;