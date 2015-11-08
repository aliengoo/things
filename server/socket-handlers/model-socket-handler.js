"use strict";

var database = require('../models/database');

module.exports = function (socket) {
  socket.on('CreateModelAction', (request, callback) => {
    database.insert(request.modelType, request.data, function (err, result) {
      callback({
        data: result,
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
        data: result,
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
};