const studentService = require('../services/studentService');

class StudentController {
  async insertStudent(req, res) {
    try {
      const { firstName, lastName, birthdate, gender, grade } = req.body;
      const data = await studentService.insertStudent(
        firstName,
        lastName,
        birthdate,
        gender,
        grade
      );

      res.status(201).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async updateStudent(req, res) {
    try {
      const { firstName, lastName, birthdate, gender, grade } = req.body;
      const { id } = req.params;

      const data = await studentService.updateStudent(
        id,
        firstName,
        lastName,
        birthdate,
        gender,
        grade
      );

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getStudentsByGrade(req, res) {
    try {
      const { grade } = req.body;
      const data = await studentService.getStudentsByGrade(grade);

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new StudentController();
