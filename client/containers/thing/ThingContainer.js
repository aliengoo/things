"use strict";

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react';
import {connect} from 'react-redux';
import {getSocket} from '../../api/socket';

import ModelControls from '../../components/controls/model-controls';
import NavBar from '../../components/outlets/nav-bar';
import Container from '../../components/layout/container';
import Row from '../../components/layout/row';
import Col from '../../components/layout/col';

// inlets - they take information in
import ThingConfig from './thing-config';
import ModelValueInput from '../../components/inlets/model-value-input';
import ModelValueSelect from '../../components/inlets/model-value-select';
import Form from '../../components/outlets/form';

// outlets - send information to the view
import ThingHeader from './components/outlets/thing-header';
import ThingAlerts from './components/outlets/thing-alerts';
import ThingName from './components/inlets/thing-name';
import ThingVendor from './components/inlets/thing-vendor';
import ThingDepartment from './components/inlets/thing-department';
import ThingUser from './components/inlets/thing-user';
import ThingAssetId from './components/inlets/thing-asset-id';

import ThingCategory from './components/inlets/thing-category';
import ThingType from './components/inlets/thing-type';

// actions
import ModelActionBundler from '../../model/actions/ModelActionBundler';

const {
  AbortEditingModelAction,
  BeginEditingModelAction,
  CreateModelAction,
  CreateModelBroadcastAction,
  DeleteModelAction,
  DeleteModelBroadcastAction,
  GetModelAction,
  InitialiseModelAction,
  SetModelPropertyAction,
  UpdateModelAction,
  UpdateModelBroadcastAction
} = ModelActionBundler.bundle("thing");

/**
 * Root container
 */
export default class ThingContainer extends Component {

  constructor(props) {
    super(props);

    this._onChangeFn = this._onChangeFn.bind(this);
    this._onAbortClick = this._onAbortClick.bind(this);
    this._onSaveClick = this._onSaveClick.bind(this);
    this._onEditClick = this._onEditClick.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
  }

  componentWillMount() {
    const {dispatch, currentModel} = this.props;

    var socket = getSocket();

    socket.on('UpdateModelActionBroadcast', (response) => {
      dispatch(UpdateModelBroadcastAction.invoke({
        updatedModelId: response.data._id,
        modelType: response.data.modelType,
        currentModelId: currentModel._id
      }));
    });

    socket.on('DeleteModelActionBroadcast', (response) => {
      dispatch(DeleteModelBroadcastAction.invoke({
        deletedModelId: response.data,
        currentModelId: currentModel._id,
        modelType: response.data.modelType
      }));
    });
  }

  componentWillUnmount() {
    const {editing, previousModel, dispatch} = this.props;

    if (editing) {
      dispatch(AbortEditingModelAction.invoke(previousModel));
    }
  }

  componentDidMount() {
    const {params, dispatch} = this.props;
    if (params && params.id) {
      dispatch(GetModelAction.invoke(params.id));
    } else {
      dispatch(InitialiseModelAction.invoke());
    }
  }

  _onChangeFn() {
    return (element) => {
      this.props.dispatch(SetModelPropertyAction.invoke(element));
    };
  }

  _onEditClick() {
    const {dispatch, currentModel} = this.props;

    dispatch(BeginEditingModelAction.invoke(currentModel));
  }

  _onSaveClick() {
    const {currentModel, dispatch} = this.props;

    if (currentModel && !currentModel._id) {
      dispatch(CreateModelAction.invoke(currentModel));
    } else {
      dispatch(UpdateModelAction.invoke(currentModel));
    }
  }

  _onDeleteClick() {
    const {currentModel, dispatch} = this.props;

    if (currentModel && currentModel._id) {
      dispatch(DeleteModelAction.invoke(currentModel._id));
    }
  }

  _onAbortClick() {
    const {previousModel, dispatch} = this.props;
    dispatch(AbortEditingModelAction.invoke(previousModel));
  }

  render() {
    const {
      fetching,
      editing,
      currentModel,
      previousModel,
      modelFormState,
      externalDelete,
      externalUpdate,
      err
      } = this.props;

    let alert = (<div></div>);

    if (err) {
      alert = (
        <Alert alertType={"danger"}>
          {err}
        </Alert>
      );
    }
    return (
      <div className="thing-view">
        <NavBar appName="Things"/>
        <Container>
          <Col>
            <ThingHeader
              currentModel={currentModel}
              editing={editing}/>

          </Col>
          <Form name="thingForm">
            <Col media="lg" gridSize={6}>
              <ThingName
                currentModel={currentModel}
                editing={editing}
                modelFormState={modelFormState}
                onChange={this._onChangeFn()}
              />

            </Col>
            <Col media="lg" gridSize={6}>

            </Col>

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

          <Col media="lg">
            <ThingAlerts externalDelete={externalDelete} externalUpdate={externalUpdate}/>
          </Col>

          <Col media="lg">
            {alert}
          </Col>
        </Container>
      </div>);

  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {

  let {thing} = state;

  return {
    fetching: thing.fetching,
    editing: thing.editing,
    currentModel: thing.currentModel,
    previousModel: thing.previousModel,
    modelFormState: thing.modelFormState,
    externalDelete: thing.externalDelete,
    externalUpdate: thing.externalUpdate,
    err: thing.err
  };
}

export default connect(select)(ThingContainer);