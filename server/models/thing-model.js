"use strict";

var mongoose = require('mongoose');

const thingSchema = new mongoose.Schema({
  category: {
    type: string,
    required: true
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
    type: string
  },
  assetId: {
    type: String
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Thing', thingSchema);