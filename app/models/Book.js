const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  pagecount: {
    type: Number,
    required: true,
  },
  authorId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
  ],
  bookTypeId:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BookType',
      required: true,
    }
});

module.exports = mongoose.model('Book', bookSchema);
