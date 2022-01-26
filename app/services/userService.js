const User = require('../models/User');
const mongoose = require('mongoose');
const config = require('../config');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

class UserService {
  async insertUser(firstName, lastName, email, password) {
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

      const hashPassword = await bCrypt.hash(password, saltRounds);
      password = hashPassword;

      await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
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

  async login(email, password) {
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

      const userData = await User.find({})
        .select('password')
        .where('email')
        .equals(email);
      const userId = userData[0]._id;

      const isCheck = await bCrypt.compare(password, userData[0].password);

      if (isCheck) {
        const token = jwt.sign({ _id: userId }, config.jwt.secret_key, {
          expiresIn: '1h',
        });
        return token;
      } else {
        return {
          warningMessage: 'User password is not correct, please try again',
        };
      }
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

  async changePassword(userId, password, newPassword) {
    let connection;
    let session;
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

      session = await User.startSession();

      if (password === newPassword) {
        return {
          warningMessage:
            "Current password and new password are same, please try again",
        };
      }

      const userInfoById = await User.find({}).where("_id").equals(userId);
      const userDbPassword = userInfoById[0].password;

      const isCheck = await bCrypt.compare(password, userDbPassword);

      if (isCheck === false) {
        return {
          warningMessage: "Current password is not correct",
        };
      } else {
        const hashPassword = await bCrypt.hash(newPassword, saltRounds);
        newPassword = hashPassword;

        await User.findByIdAndUpdate(
          { _id: userId },
          { password: newPassword }
        );

        session.endSession();

        return {
          isSuccess: true,
        };
      }
    } catch (error) {}
  }
}

module.exports = new UserService();
