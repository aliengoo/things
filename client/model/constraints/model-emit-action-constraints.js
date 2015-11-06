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

// used when creating the action template, not invoking the action itself
const ModelEmitActionConstraints = {
  actionType: SharedConstraint,
  modelType: SharedConstraint,
  container: SharedConstraint,

  // constraint specification for the the "action.data" value.  It should be used before emitting data to the server.
  dataConstraint: {
    presence: true
  }
};

export default ModelEmitActionConstraints;