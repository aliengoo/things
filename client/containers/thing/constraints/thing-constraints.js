"use strict";

import validate from 'validate.js';

export default {
  name: {
    presence: {
      message: "thing.name is required"
    }
  },

  category: {
    presence: {
      message: "thing.category is required"
    }
  },

  type: {
    presence: {
      message: "thing.type is required"
    }
  }

  // TODO: thing-constraints

};