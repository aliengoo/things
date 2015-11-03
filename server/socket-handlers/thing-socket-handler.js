"use strict";

const Thing = require('../models/thing-model');
const assign = require('object-assign');
const _ = require('lodash');
const validateQueryRequest = require('../helpers/query-helper').validateQueryRequest;

module.exports = thingSocketHandler;

function thingSocketHandler(socket) {
  // CRUD
  socket.on('CreateThingAction', (request, callback) => {
    var thing = new Thing(request.data);

    thing.save(function (err) {
      callback({
        data: thing,
        err: err
      });

      if (!err) {
        socket.broadcast.emit("CreateThingActionBroadcastAction", {
          socketId: socket.id,
          data: thing
        });
      }
    });
  });

  socket.on('UpdateThingAction', (request, callback) => {

    var thing = assign({}, request.data);

    var validateThing = new Thing(thing);

    validateThing.validate(function(err){
      if (err) {
        callback({
          err: err
        });
      } else {
        Thing.update({
          _id: thing._id
        }, {
          $set: thing
        }, {
          "new": true,
          upsert: true
        }, function(err, updatedThing) {
          callback({
            err: err,
            data: updatedThing
          });

          if (!err) {
            socket.broadcast.emit("UpdateThingActionBroadcastAction", {
              socketId: socket.id,
              data: updatedThing
            });
          }
        });
      }
    });
  });

  socket.on('DeleteThingAction', (request, callback) => {

    if (!_.isString(request.data)) {
      callback({
        err: {
          message: "BadRequest: DeleteThingAction expected the request.data to be a string"
        }
      });
    } else {
      Thing.remove({
        _id: request.data
      }, function (err) {
        callback({
          err: err,
          // send back the id of the item deleted
          data: request.data
        });

        if (!err) {
          socket.broadcast.emit("DeleteThingActionBroadcastAction", {
            data: request.data
          });
        }
      });
    }
  });

  socket.on('FindThingsAction', (request, callback) => {

    let clientQuery = assign({}, request.data);

    validateQueryRequest(clientQuery, "FindThingAction", function(errors, meta){
      if (errors.length > 0) {
        callback({
          err: errors
        });
      } else {
        let query =  Thing.find(clientQuery.query);

        if (meta.hasLimitProperty) {
          query.limit(clientQuery.limit);
        }

        if (meta.hasSortProperty) {
          query.sort(clientQuery.sort);
        }

        if (meta.hasSelectProperty) {
          query.select(clientQuery.select);
        }

        query.exec(function (err, results) {
          callback({
            err: err,
            data: results
          });
        });
      }
    });
  });
}

