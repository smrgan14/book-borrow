const bookService = require('../services/bookService');

class BookController {
  async insertBook(req, res) {
    try {
      const { name, pagecount, authorId, bookTypeId } = req.body;
      const data = await bookService.insertBook(
        name,
        pagecount,
        authorId,
        bookTypeId
      );

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getBookList(req, res) {
    try {
      const data = await bookService.getBookList();

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new BookController();
