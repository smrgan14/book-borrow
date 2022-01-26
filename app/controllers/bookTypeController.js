const bookTypeService = require('../services/bookTypeService');

class BookTypeController {
  async insertBookType(req, res) {
    try {
      const { name } = req.body;
      const data = await bookTypeService.insertBookType(name);

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async updateBookType(req, res) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const data = await bookTypeService.updateBookType(id, name);

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new BookTypeController();
