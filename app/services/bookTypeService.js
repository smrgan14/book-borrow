const mongoose = require("mongoose");
const BookType = require("../models/BookType");
const config = require("../config");

class BookTypeService {
  async insertBookType(name) {
    let connection;
    try {
      await mongoose.connect(
        `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
      );
      connection = mongoose.connection;

      connection.on("err", (err) => {
        if (err) return err;
      });

      connection.once("open", () => {
        console.log("Connected to DB");
      });

      await BookType.create({
        name: name,
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

  async updateBookType(id, name) {
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

      await BookType.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          name: name,
        }
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
}

module.exports = new BookTypeService();
