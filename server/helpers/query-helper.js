"use strict";

const _ = require('lodash');

module.exports.validateQueryRequest = function (clientQuery, actionName, callback) {

  // must contain a data property, and the property must be an object
  var errors = [];
  var meta;

  if (!_.isObject(clientQuery)) {
    errors.push(`BadRequest: ${actionName} expected the request.data property to be an object`);
  } else {
    meta = {
      hasLimitProperty: clientQuery.hasOwnProperty('limit'),
      hasSortProperty: clientQuery.hasOwnProperty('sort'),
      hasSelectProperty: clientQuery.hasOwnProperty('select')
    };
    var validateQueryPropertyResult = validateQueryProperty(clientQuery, meta, actionName);

    if (validateQueryPropertyResult) {
      errors.push(validateQueryPropertyResult);
    }

    var validateLimitPropertyResult = validateLimitProperty(clientQuery, meta, actionName);

    if (validateLimitPropertyResult) {
      errors.push(validateLimitPropertyResult);
    }

    var validateSortPropertyResult = validateSortProperty(clientQuery, meta, callback);

    if (validateSortPropertyResult) {
      errors.push(validateSortPropertyResult);
    }

    var validateSelectPropertyResult = validateSelectProperty(clientQuery, meta, callback);

    if (validateSelectPropertyResult) {
      errors.push(validateSelectPropertyResult);
    }
  }

  callback(errors, meta);
};

function validateQueryProperty(clientQuery, meta, actionName) {
  if (!_.isObject(clientQuery.query)) {
    return `BadRequest: ${actionName} expected request.data.query to be an object`;
  }

  return undefined;
}

function validateLimitProperty(clientQuery, meta, actionName) {
  if (meta.hasLimitProperty && !_.isNumber(request.data.limit)) {
    return `BadRequest: ${actionName} expected request.data.limit to be a number`;
  }

  return undefined;
}

function validateSortProperty(clientQuery, meta, actionName) {
  if (meta.hasSortProperty && (!_.isString(clientQuery.sort) || !_.isObject(clientQuery.sort))) {

    // TODO: validateSortProperty could perform deeper analysis of a sort request
    return `BadRequest: ${actionName} expected request.data.sort to be a string or an object`;
  }

  return undefined;
}

function validateSelectProperty(clientQuery, meta, actionName) {
  if (meta.hasSelectProperty && !_.isString(clientQuery.select)) {
    return `BadRequest: ${actionName} expected request.data.select to be a string`;
  }

  return undefined;
}
