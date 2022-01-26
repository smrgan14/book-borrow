const borrowService = require('../services/borrowService');

class BorrowController {
  async insertBorrow(req, res) {
    try {
      const { studentId, bookId, takenDate, broughtDate } = req.body;
      const data = await borrowService.insertBorrow(
        studentId,
        bookId,
        takenDate,
        broughtDate
      );

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async updateBorrow(req, res) {
    try {
      const { studentId, bookId, takenDate, broughtDate } = req.body;
      const { id } = req.params;
      const data = await borrowService.updateBorrow(
        id,
        studentId,
        bookId,
        takenDate,
        broughtDate
      );

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getBorrowsByTakenDate(req, res) {
    try {
      const { takenDate } = req.body;
      const data = await borrowService.getBorrowsByTakenDate(takenDate);

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getBorrowsByPeriod(req, res) {
    try {
      const { dateFrom, dateTo } = req.body;
      const data = await borrowService.getBorrowsByPeriod(dateFrom, dateTo);

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new BorrowController();
