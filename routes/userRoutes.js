const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const User = require('../models/userModel')

// anyone can 
router.get('/all-user', userController.getAllUsers)

router.get('/:id', userController.getSingleUser)



// create user or signup
router.post('/signup', userController.signup)

// login user
router.post('/login', userController.signin)

// update the user data
router.patch('/:id', userController.updateUser)

// delete the user
router.delete('/:id', userController.deleteUser)

// router.patch('/change-password/:id', userController.changePassword)


module.exports = router;
