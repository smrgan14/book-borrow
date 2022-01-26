const express = require('express');
const userController = require('../controllers/userController');
const protectRoutesMiddleware = require('../middleware/protectRoutesMiddleware');
const userValidationMiddleware = require('../middleware/userValidationMiddleware');
const userRouter = express.Router();

userRouter.post('/user', userValidationMiddleware.validateUserData, userController.insertUser);
userRouter.post('/login', userController.login);
userRouter.put('/changepassword', protectRoutesMiddleware.protectRoutes, userController.checkPassword);

module.exports = userRouter;
