const express = require('express');
const studentController = require('../controllers/studentController');
const protectRoutesMiddleware = require('../middleware/protectRoutesMiddleware');
const studentValidationMiddleware = require('../middleware/studentValidationMiddleware');

const studentRouter = express.Router();

studentRouter.post(
  '/student',
  protectRoutesMiddleware.protectRoutes,
  studentValidationMiddleware.validateStudentData,
  studentController.insertStudent
);
studentRouter.put(
  '/student/:id',
  protectRoutesMiddleware.protectRoutes,
  studentController.updateStudent
);
studentRouter.get(
  '/student/grade',
  protectRoutesMiddleware.protectRoutes,
  studentController.getStudentsByGrade
);

module.exports = studentRouter;
