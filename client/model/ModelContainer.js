"use strict";

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react';
import {getSocket} from '../api/socket';

// actions
import ModelActionBundler from './actions/ModelActionBundler';

export default class ModelContainer extends Component {

  constructor(props) {
    super(props);
    this._onAbortClick = this._onAbortClick.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onEditClick = this._onEditClick.bind(this);
    this._onSaveClick = this._onSaveClick.bind(this);
  }

  componentWillMount() {
    // initialise the actions, and bind the actions to the ModelContainer
    let actions = ModelActionBundler.bundle(this.props.containerModel.modelType);
    let self = this;

    for (let key in actions) {
      if (actions.hasOwnProperty(key)) {
        self[key] = actions[key];
      }
    }
    this._initialiseModel();
    this._watchForExternalChanges();
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
    const {dispatch, containerModel} = this.props;

    dispatch(this.BeginEditingModelAction.invoke(containerModel.currentModel));
  }

  _onSaveClick() {
    const {containerModel, dispatch} = this.props;
    const currentModel = containerModel.currentModel;

    if (currentModel && !currentModel._id) {
      dispatch(this.CreateModelAction.invoke(currentModel));
    } else {
      dispatch(this.UpdateModelAction.invoke(currentModel));
    }
  }

  _onDeleteClick() {
    const {containerModel, dispatch} = this.props;
    const currentModel = containerModel.currentModel;


    if (currentModel && currentModel._id) {
      dispatch(this.DeleteModelAction.invoke(currentModel._id));
    }
  }

  _onAbortClick() {
    this._abortEditing();
  }

  _initialiseModel() {
    const {params, dispatch, containerModel} = this.props;
    if (params && params.id) {
      dispatch(this.GetModelAction.invoke(params.id));
    } else {
      dispatch(this.InitialiseCurrentModelAction.invoke({}));
      dispatch(this.BeginEditingModelAction.invoke(containerModel.currentModel));
    }
  }

  _abortEditing() {
    const {containerModel, dispatch} = this.props;

    if (containerModel.editing) {
      dispatch(this.AbortEditingModelAction.invoke(containerModel.previousModel));
    }
  }

  _watchForExternalChanges() {
    const {dispatch, containerModel} = this.props;

    let socket = getSocket();

    socket.on('UpdateModelActionBroadcast', (response) => {
      dispatch(this.UpdateModelBroadcastAction.invoke({
        updatedModelId: response.data._id,
        modelType: response.data.modelType,
        currentModelId: containerModel.currentModel._id
      }));
    });

    socket.on('DeleteModelActionBroadcast', (response) => {
      dispatch(this.DeleteModelBroadcastAction.invoke({
        deletedModelId: response.data,
        currentModelId: containerModel.currentModel._id,
        modelType: response.data.modelType
      }));
    });
  }
}

ModelContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  containerModel: PropTypes.object.isRequired
};


