import ModelAction from './ModelAction';
import keyMirror from 'keymirror';
import Q from 'q';

const FetchStatus = keyMirror({
  FETCHING: null,
  COMPLETE: null,
  FAILED: null
});

export {
  FetchStatus
};

export class SocketModelAction extends ModelAction {
  constructor(actionType, modelType) {
    super(actionType, modelType);
    this.emitter =`${actionType}:${modelType}`;
  }

  _createFetchStatusActions() {
    return {
      fetching: (data) => {
        return {
          actionType: this.actionType,
          modelType: this.modelType,
          data,
          fetchStatus: FetchStatus.FETCHING
        };
      },
      complete: (data) => {
        return {
          actionType: this.actionType,
          modelType: this.modelType,
          data, fetchStatus: FetchStatus.COMPLETE
        };
      },
      failed: (data) => {
        return {
          actionType: this.actionType,
          modelType: this.modelType,
          data,
          fetchStatus: FetchStatus.FAILED
        };
      }
    };
  }

  invoke(data) {
    return (dispatch) => {
      const {
        fetching,
        complete,
        failed
        } = this._createFetchStatusActions().bind(this);

      dispatch(fetching(data));

      let defer = Q.defer();

      socket.emit(this.emitter, {
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
