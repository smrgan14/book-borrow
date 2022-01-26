const mongoose = require('mongoose');

const checkEmailStructure = [
  (email) => {
    let character = '@';

    return email.includes(character);
  },
  'Incorrect email structure',
];

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: checkEmailStructure,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = mongoose.model('User', userSchema);
