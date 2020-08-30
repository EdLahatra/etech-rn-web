const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  deviseInfo: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  onwer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Device', DeviceSchema);
