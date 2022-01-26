const express = require('express');
const bookController = require('../controllers/bookController');
const protectRoutesMiddleware = require('../middleware/protectRoutesMiddleware');

const bookRouter = express.Router();

bookRouter.post('/book', protectRoutesMiddleware.protectRoutes, bookController.insertBook);
bookRouter.get('/books', protectRoutesMiddleware.protectRoutes, bookController.getBookList);

module.exports = bookRouter;
