"use strict";

var database = require('../models/database');

module.exports = function (socket) {
  socket.on('CreateModelAction', (request, callback) => {
    database.insert(request.modelType, request.data, function (err, result) {
      callback({
        data: result.ops[0],
        err: err
      });

      if (!err) {
        socket.broadcast.emit("CreateModelBroadcastAction", {
          data: {
            createdModelId: result._id
          }
        });
      }
    });
  });

  socket.on('UpdateModelAction', (request, callback) => {
    database.update(request.modelType, request.data, function(err, result) {

      callback({
        data: request.data,
        err: err
      });

      if (!err) {
        socket.broadcast.emit("UpdateModelBroadcastAction", {
          data: {
            updatedModelId: result._id
          }
        });
      }
    })
  });

  socket.on('DeleteModelAction', (request, callback) => {
    console.log("Deleting:", request);
    database.removeById(request.modelType, request.data, function (err, result) {
      callback({
        data: request.data,
        err: err
      });

      if (!err) {
        socket.broadcast.emit("DeleteModelBroadcastAction", {
          data: {
            deletedModelId: request.data
          }
        });
      }
    });
  });

  socket.on('GetModelAction', (request, callback) => {
    database.findById(request.modelType, request.data, function (err, result) {
      callback({
        data: result,
        err: err
      });
    });
  });

  socket.on('ApplyFilterAction', (request, callback) => {
    database.find(request.modelType, request.data.filter, request.data.filter.page, function (err, result) {
      callback({
        data: result,
        err: err
      });
    });
  });
};