"use strict";

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react';
import {getSocket} from '../api/socket';

// actions
import ModelActionBundler from './actions/ModelActionBundler';

export default class ModelContainer extends Component {

  componentWillMount() {
    // initialise the actions, and bind the actions to the ModelContainer
    let actions = ModelActionBundler.bundle(this.props.modelType);

    for (let key in actions) {
      if (actions.hasOwnProperty(key)) {
        this[key] = actions[key];
      }
    }
    this._watchForExternalChanges();
  }

  componentDidMount() {
    this._initialiseModel();
  }

  componentWillUnmount() {
    this._abortEditing();
  }

  _onModelElementChange() {
    return (element) => {
      this.props.dispatch(this.SetModelPropertyAction.invoke(element));
    };
  }

  _onEditClick() {
    const {dispatch, currentModel} = this.props;

    dispatch(this.BeginEditingModelAction.invoke(currentModel));
  }

  _onSaveClick() {
    const {currentModel, dispatch} = this.props;

    if (currentModel && !currentModel._id) {
      dispatch(this.CreateModelAction.invoke(currentModel));
    } else {
      dispatch(this.UpdateModelAction.invoke(currentModel));
    }
  }

  _onDeleteClick() {
    const {currentModel, dispatch} = this.props;

    if (currentModel && currentModel._id) {
      dispatch(this.DeleteModelAction.invoke(currentModel._id));
    }
  }

  _onAbortClick() {
    this._abortEditing();
  }

  _initialiseModel() {
    const {params, dispatch} = this.props;
    if (params && params.id) {
      dispatch(this.GetModelAction.invoke(params.id));
    } else {
      dispatch(this.InitialiseModelAction.invoke());
    }
  }

  _abortEditing() {
    const {editing, previousModel, dispatch} = this.props;

    if (editing) {
      dispatch(this.AbortEditingModelAction.invoke(previousModel));
    }
  }

  _watchForExternalChanges() {
    const {dispatch, currentModel} = this.props;

    let socket = getSocket();

    socket.on('UpdateModelActionBroadcast', (response) => {
      dispatch(this.UpdateModelBroadcastAction.invoke({
        updatedModelId: response.data._id,
        modelType: response.data.modelType,
        currentModelId: currentModel._id
      }));
    });

    socket.on('DeleteModelActionBroadcast', (response) => {
      dispatch(this.DeleteModelBroadcastAction.invoke({
        deletedModelId: response.data,
        currentModelId: currentModel._id,
        modelType: response.data.modelType
      }));
    });
  }

  render() {
    return (
      <div>
        <Form>
          {this.props.children}
          <Col media="lg">
            <ModelControls
              editing={editing}
              isNew={currentModel && !currentModel._id}
              isValid={modelFormState.valid}
              onEditClick={this._onEditClick}
              onSaveClick={this._onSaveClick}
              onAbortClick={this._onAbortClick}
              onDeleteClick={this._onDeleteClick}
            />
          </Col>
        </Form>

      </div>);
  }
}

ModelContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  editing: PropTypes.bool,
  currentModel: PropTypes.object,
  previousModel: PropTypes.object,
  modelFormState: PropTypes.object.isRequired,
  externalDelete: PropTypes.bool,
  externalUpdate: PropTypes.bool,
  err: PropTypes.object
};


