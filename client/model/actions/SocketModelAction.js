import ModelAction from './ModelAction';
import keyMirror from 'keymirror';
import Q from 'q';
import {getSocket} from '../../api/socket';

const FetchStatus = keyMirror({
  FETCHING: null,
  COMPLETE: null,
  FAILED: null
});

export {
  FetchStatus
};

export class SocketModelAction extends ModelAction {
  constructor(type, modelType) {
    super(type, modelType);
    this.emitter = `${type}`;

  }

  _createFetchStatusActions() {
    return {
      fetching: (data) => {
        return {
          type: this.type,
          modelType: this.modelType,
          data,
          fetchStatus: FetchStatus.FETCHING
        };
      },
      complete: (data) => {
        return {
          type: this.type,
          modelType: this.modelType,
          data, fetchStatus: FetchStatus.COMPLETE
        };
      },
      failed: (data) => {
        return {
          type: this.type,
          modelType: this.modelType,
          data,
          fetchStatus: FetchStatus.FAILED
        };
      }
    };
  }

  invoke(data) {
    var self = this;

    return (dispatch) => {
      const {
        fetching,
        complete,
        failed
        } = self._createFetchStatusActions();

      dispatch(fetching(data));

      let defer = Q.defer();

      let socket = getSocket();

      socket.emit(self.emitter, {
        modelType: self.modelType,
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

}
