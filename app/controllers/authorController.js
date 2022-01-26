const authorService = require('../services/authorService');

class AuthorController {
  async insertAuthor(req, res) {
    try {
      const { firstName, lastName } = req.body;
      const data = await authorService.insertAuthor(firstName, lastName);

      res.status(201).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async updateAuthor(req, res) {
    try {
      const { firstName, lastName } = req.body;
      const { id } = req.params;
      const data = await authorService.updateAuthor(id, firstName, lastName);

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getListOfAuthors(req, res) {
    try {
      const data = await authorService.getListOfAuthors();

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async deleteAuthor(req, res) {
    try {
      const { id } = req.params;
      const data = await authorService.deleteAuthor(id);

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new AuthorController();
