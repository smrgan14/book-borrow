const mongoose = require('mongoose');
const Student = require('../models/Student');
const config = require('../config');

class StudentService {
  async insertStudent(firstName, lastName, birthdate, gender, grade) {
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

      await Student.create({
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        gender: gender,
        grade: grade,
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

  async updateStudent(id, firstName, lastName, birthdate, gender, grade) {
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

      await Student.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          firstName: firstName,
          lastName: lastName,
          birthdate: birthdate,
          gender: gender,
          grade: grade,
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

  async getStudentsByGrade(grade) {
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

      const studentsListByGrade = await Student.find({})
        .where('grade')
        .equals(grade);

      if (studentsListByGrade.length === 0)
        return {
          warningMessage: 'No students in this grade, please try again',
        };

      return {
        list: studentsListByGrade,
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

module.exports = new StudentService();
