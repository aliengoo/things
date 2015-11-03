"use strict";

var mongoose = require('mongoose');

const thingSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  department: {
    type: String
  },
  user: {
    type: String
  },
  type: {
    type: string,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  vendor: {
    type: String
  },
  serialNo: {
    type: String
  },
  assetId: {
    type: String
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Thing', thingSchema);