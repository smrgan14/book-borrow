const mongoose = require('mongoose');

const genderVal = ['Male', 'Female'];

const genderValidator = [
    (val) => {
       return (val === genderVal[0] || val === genderVal[1])
    },
    `You need enter ${genderVal[0]} or ${genderVal[1]} value for gender field`
]

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    validate: genderValidator
  },
  grade: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Student', studentSchema);
