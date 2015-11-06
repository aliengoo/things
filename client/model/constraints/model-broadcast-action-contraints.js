"use strict";

import validate from 'validate.js';

const SharedConstraint = {
  presence: true,
  minimum: 2,
  maximum: 50,
  format: {
    pattern: "[a-z0-9]+",
    flags: "i",
    message: "can only contain a-z and 0-9"
  }
};

export default {
  actionType: SharedConstraint,
  modelType: SharedConstraint,
  container: SharedConstraint
}