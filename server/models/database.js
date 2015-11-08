"use strict";

var MongoClient = require('mongodb').MongoClient;
var assign = require('object-assign');
var url = "mongodb://localhost/things";
var paginationHelper = require('../helpers/pagination-helper');
var database;

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.error(err);
  } else {
    database = db;
  }
});

module.exports.close = function close() {
  database.close();
};

module.exports.insert = function insert(collectionName, document, callback) {
  var collection = database.collection(collectionName);
  collection.insert(document, callback);
};

module.exports.update = function update(collectionName, document, callback) {
  var collection = database.collection(collectionName);

  if (!document.hasOwnProperty("_id") && !document._id) {
    callback("Update requires an _id");
  } else {

    var update = {$set: assign({}, document)};
    var options = {
      upsert: false,
      returnOriginal: false
    };
    delete update._id;

    collection.findOneAndUpdate({
      _id: document._id
    }, update, options, callback)
  }
};

module.exports.removeById = function removeById(collectionName, _id, callback) {
  var collection = database.collection(collectionName);
  collection.removeOne({
    _id: _id
  }, callback);
};

module.exports.findById = function findById(collectionName, _id, callback) {
  var collection = database.collection(collectionName);
  collection.findOne({
    _id: _id
  }, callback);
};

module.exports.find = function find(collectionName, filter, page, callback) {
  var collection = database.collection(collectionName);

  collection.count(filter, function(err, count){
    if (err) {
      callback(err);
    } else {
      paginationHelper.calculate(page, count);

      collection
        .find(filter)
        .skip(page.skip)
        .limit(page.limit)
        .toArray(function(err, results) {
          if (err) {
            callback(err);
          } else {
            callback(undefined, {
              page: page,
              results: results
            });
          }
        });
    }
  });
};