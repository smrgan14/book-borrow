const express = require('express');
const bookTypeController = require('../controllers/bookTypeController');
const protectRoutesMiddleware = require('../middleware/protectRoutesMiddleware');
const bookTypeValidationMiddleware = require('../middleware/bookTypeValidationMiddleware');

const bookTypeRouter = express.Router();

bookTypeRouter.post(
  '/booktype',
  protectRoutesMiddleware.protectRoutes,
  bookTypeValidationMiddleware.validateBookTypeData,
  bookTypeController.insertBookType
);
bookTypeRouter.put(
  '/booktype/:id',
  protectRoutesMiddleware.protectRoutes,
  bookTypeController.updateBookType
);

module.exports = bookTypeRouter;
