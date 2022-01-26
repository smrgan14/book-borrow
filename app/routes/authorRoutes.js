const express = require('express');
const authorController = require('../controllers/authorController');
const protectRoutesMiddleware = require('../middleware/protectRoutesMiddleware');
const authorValidationMiddleware = require('../middleware/authorValidationMiddleware');

const authorRouter = express.Router();

authorRouter.post('/author', protectRoutesMiddleware.protectRoutes, authorValidationMiddleware.validateAuthorData, authorController.insertAuthor);
authorRouter.put('/author/:id', protectRoutesMiddleware.protectRoutes, authorController.updateAuthor);
authorRouter.get('/authors', protectRoutesMiddleware.protectRoutes, authorController.getListOfAuthors);
authorRouter.delete('/author/:id', protectRoutesMiddleware.protectRoutes, authorController.deleteAuthor);

module.exports = authorRouter;
