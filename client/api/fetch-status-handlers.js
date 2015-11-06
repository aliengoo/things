"use strict";

import FetchStatus from './fetch-status';

export function fetching(actionType, data) {
  return {
    fetchStatus: FetchStatus.FETCHING,
    actionType,
    data
  };
}

export function complete(actionType, data) {
  return {
    fetchStatus: FetchStatus.COMPLETE,
    actionType,
    data
  };
}

export function failed(actionType, data) {
  return {
    fetchStatus: FetchStatus.FAILED,
    actionType,
    data
  };
}

export function createHandlers(actionType) {
  return {
    fetching: (data) => {
      return {
        actionType,
        data,
        fetchStatus: FetchStatus.FETCHING
      };
    },
    complete: (data) => {
      return {
        actionType,
        data, fetchStatus: FetchStatus.COMPLETE
      };
    },
    failed: (data) => {
      return {
        actionType,
        data,
        fetchStatus: FetchStatus.FAILED
      };
    }
  };
}