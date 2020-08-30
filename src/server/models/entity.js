const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
  attribut: {
    type: String,
    required: true,
  },
  attribut1: {
    type: String,
    required: true,
  },
  attribut2: {
    type: String,
    required: true,
  },
  onwer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Entity', EntitySchema);
