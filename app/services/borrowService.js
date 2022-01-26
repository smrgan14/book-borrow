const mongoose = require('mongoose');
const Borrow = require('../models/Borrow');
const config = require('../config');

class BorrowService {
  async insertBorrow(studentId, bookId, takenDate, broughtDate) {
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

      // TAKE DAY,MOUNTH AND YEAR VALUES FROM takenDate variable
      const date = new Date(takenDate);
      const takenDay = date.getDate();
      const takenMonth = date.getMonth() + 1;
      const takenYear = date.getFullYear();

      // TAKE DAY,MOUNTH AND YEAR VALUES FROM CURRENT DATE
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMounth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      if (
        takenDay < currentDay &&
        takenMonth === currentMounth &&
        takenYear === currentYear
      ) {
        return {
          warningDateMessage:
            'The selected day is less than the current day, please try again',
        };
      }

      if (takenMonth < currentMounth && takenYear === currentYear) {
        return {
          warningDateMessage:
            'The selected mounth is less than the current mounth, please try again',
        };
      }

      await Borrow.create({
        studentId: studentId,
        bookId: bookId,
        takenDate,
        broughtDate,
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

  async updateBorrow(id, studentId, bookId, takenDate, broughtDate) {
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

      // GET DAY,MOUNTH AND YEAR takenDate
      const takenDateInfo = new Date(takenDate);
      const takenDay = takenDateInfo.getDate();
      const takenMonth = takenDateInfo.getMonth() + 1;
      // const takenYear = takenDateInfo.getFullYear();

      // GET DAY,MOUNTH AND YEAR broughtDate
      const broughtDateInfo = new Date(broughtDate);
      const broughtDay = broughtDateInfo.getDate();
      const broughtMonth = broughtDateInfo.getMonth() + 1;
      // const broughtYear = broughtDateInfo.getFullYear();

      // TAKE DAY,MOUNTH AND YEAR VALUES FROM CURRENT DATE
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMounth = currentDate.getMonth() + 1;
      // const currentYear = currentDate.getFullYear();

      if (broughtDay < takenDay && takenMonth === broughtMonth) {
        return {
          warningDateMessage:
            'The brought day is less than the taken day, please try again',
        };
      }

      if (broughtDay > currentDay && broughtMonth === currentMounth) {
        return {
          warningDateMessage:
            'The brought day is greater than current day, please try again',
        };
      }

      await Borrow.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          studentId: studentId,
          bookId: bookId,
          takenDate: takenDate,
          broughtDate: broughtDate,
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

  async getBorrowsByTakenDate(takenDate) {
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

      const listOfBorrows = await Borrow.find({})
        .where('takenDate')
        .equals(takenDate);

      if (listOfBorrows.length === 0) {
        return {
          warningMessage: `The borrow list on this date ${takenDate} is empty, please try again`,
        };
      }

      return {
        list: listOfBorrows,
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

  async getBorrowsByPeriod(dateFrom, dateTo) {
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

      const borrowsByPeriod = await Borrow.find({})
        .populate({
          path: 'studentId',
        })
        .populate({
          path: 'bookId'
        })
        .where('takenDate')
        .gte(dateFrom)
        .lte(dateTo);

      if (borrowsByPeriod.length === 0) {
        return {
          warningMessage: `The borrow list by this period ${dateFrom} - ${dateTo} is empty, please try again`,
        };
      }

      return {
        list: borrowsByPeriod,
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

module.exports = new BorrowService();
