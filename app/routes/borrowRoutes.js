const express = require('express');
const borrowController = require('../controllers/borrowController');
const protectRoutesMiddleware = require('../middleware/protectRoutesMiddleware');
const borrowValidationMiddleware = require('../middleware/borrowValidationMiddleware');

const borrowRouter = express.Router();

borrowRouter.post('/borrow', protectRoutesMiddleware.protectRoutes, borrowValidationMiddleware.validateBorrowData, borrowController.insertBorrow);
borrowRouter.put('/borrow/:id', protectRoutesMiddleware.protectRoutes, borrowController.updateBorrow);
borrowRouter.get('/borrow/takendate', protectRoutesMiddleware.protectRoutes, borrowController.getBorrowsByTakenDate);
borrowRouter.get('/borrow/period', protectRoutesMiddleware.protectRoutes, borrowController.getBorrowsByPeriod);

module.exports = borrowRouter;
