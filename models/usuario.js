const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },

  sobrenome: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
