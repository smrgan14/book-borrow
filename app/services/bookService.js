const mongoose = require('mongoose');
const Book = require('../models/Book');
const config = require('../config');
const { query } = require('express');

class BookService {
  async insertBook(name, pagecount, authorId, bookTypeId) {
    let connection;
    try {
      await mongoose.connect(
        `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
      );
      connection = mongoose.connection;

      connection.on('err', (err) => {
        if (err) return err;
      });

      connection.once('open', () => {
        console.log('Connected to DB');
      });

      await Book.create({
        name: name,
        pagecount: pagecount,
        authorId: authorId,
        bookTypeId: bookTypeId,
      });

      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        errorMessage: error.message,
      };
    } finally {
      if (connection) {
        mongoose.connection.close();
      }
    }
  }

  async getBookList() {
    let connection;
    try {
      await mongoose.connect(
        `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
      );
      connection = mongoose.connection;

      connection.on('err', (err) => {
        if (err) return err;
      });

      connection.once('open', () => {
        console.log('Connected to DB');
      });

      const listOfBooks = await Book.aggregate([
        {
          $lookup: {
            from: 'authors',
            localField: 'authorId',
            foreignField: '_id',
            as: 'authors',
          },
        },
        {
          $lookup: {
            from: 'booktypes',
            localField: 'bookTypeId',
            foreignField: '_id',
            as: 'bookType',
          },
        },
      ]);

      if (listOfBooks === null)
        return { warningMessage: 'The list of books is empty' };

      return {
        list: listOfBooks,
      };
    } catch (error) {
      return {
        errorMessage: error.message,
      };
    } finally {
      if (connection) {
        mongoose.connection.close();
      }
    }
  }
}

module.exports = new BookService();
