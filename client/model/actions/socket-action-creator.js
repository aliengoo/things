"use strict";

import Q from 'q';

import FetchStatus from '../../api/fetch-status';
import {createHandlers} from '../../api/fetch-status-handlers';
import {getSocket} from '../../api/socket';
import ConstraintValidation from '../constraints/constraint-validation';

export default function creator(options) {
  return {
    invoke: (data) => createEmit(options, data),
    actionType: options.actionType,
    container: options.container
  };
}

/**
 * Emits the socket event with data
 * @param options
 * @param data - the data.  The data is a property of the request passed to the socket, e.g. {data: data}
 * @returns {Function}
 */
function createEmit(options, data) {
  var socket = getSocket();

  return dispatch => {

    // validate data sent to the server

    if (options.dataConstraint) {
      ConstraintValidation.validate(
        data,
        options.dataConstraint,
        true);
    }

    const {
      fetching,
      complete,
      failed
      } = createHandlers(options.actionType);

    dispatch(fetching(data));

    let defer = Q.defer();

    let emitter = options.modelType ? `${options.actionType}:${options.modelType}` : options.actionType;

    socket.emit(emitter, {
      data
    }, (response) => {
      // both resolve, even if there is an error
      if (response.err) {
        dispatch(failed(response.err));
      } else {
        dispatch(complete(response.data));
      }

      defer.resolve();
    });

    return defer.promise;
  };
}
