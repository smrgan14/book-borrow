const userService = require('../services/userService');
const User = require('../models/User');

class UserController {
  async insertUser(req, res) {
    try {
      console.log("SESSION", req.session.cookie);
      const { firstName, lastName, email, password } = req.body;
      const data = await userService.insertUser(
        firstName,
        lastName,
        email,
        password
      );

      res.status(201).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await userService.login(email, password);

      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  async checkPassword(req, res) {
    try {
      const { password, newPassword } = req.body;
      const userId = req.decoded._id;
      const data = await userService.changePassword(
        userId,
        password,
        newPassword
      );

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new UserController();
