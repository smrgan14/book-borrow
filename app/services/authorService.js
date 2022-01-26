const mongoose = require('mongoose');
const Author = require('../models/Author');
const config = require('../config');

class AuthorService {
  async insertAuthor(firstName, lastName) {
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

      await Author.create({
        firstName: firstName,
        lastName: lastName,
      });

      return {
        isSuccess: true,
      };
    } catch (error) {
      return {
        errorMessage: error,
      };
    } finally {
      if (connection) {
        mongoose.connection.close();
      }
    }
  }

  async updateAuthor(id, firstName, lastName) {
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

      await Author.findByIdAndUpdate(
        { _id: id },
        { firstName: firstName, lastName: lastName }
      );

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

  async getListOfAuthors() {
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

      const listOfAuthors = await Author.find({});

      if (listOfAuthors.length === 0) {
        return {
          warningMessage: 'The list of authors is empty',
        };
      }

      return {
        list: listOfAuthors,
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

  async deleteAuthor(id) {
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

      await Author.findByIdAndDelete({ _id: id });

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
}

module.exports = new AuthorService();
