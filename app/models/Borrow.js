const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Student',
    required: true,
  },
  bookId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Book',
    required: true,
  }],
  takenDate: {
    type: Date,
    required: true,
  },
  broughtDate: {
    type: Date,
  },
});

module.exports = mongoose.model('Borrow', borrowSchema);
