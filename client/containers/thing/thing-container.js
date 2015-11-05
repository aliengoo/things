"use strict";

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react';
import {connect} from 'react-redux';
import {getSocket} from '../../api/socket';
import $ from 'jquery';

import ModelControls from '../../components/controls/model-controls';
import NavBar from '../../components/outlets/nav-bar';
import Container from '../../components/layout/container';
import Row from '../../components/layout/row';
import Col from '../../components/layout/col';

import {ContainerChangeAction} from '../actions/common-actions';

import {
  AbortEditingThingAction,
  StartEditingThingAction,
  UpdateThingAction,
  DeleteThingAction,
  CreateThingAction,
  SetThingPropertyAction,
  SetThingFormPropertyValidityAction,
  UpdateThingActionBroadcastAction,
  DeleteThingActionBroadcastAction,
  InitThingAction,
  GetThingAction
} from './actions/thing-actions';

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


/**
 * Root container
 */
export default class ThingContainer extends Component {

  constructor(props) {
    super(props);

    this._setModelValue = this._setModelValue.bind(this);
    this._onAbortClick = this._onAbortClick.bind(this);
    this._onSaveClick = this._onSaveClick.bind(this);
    this._onEditClick = this._onEditClick.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(ContainerChangeAction.create(ThingConfig.container));

    var socket = getSocket();

    socket.on('UpdateThingActionBroadcastAction', (response) => {
      UpdateThingActionBroadcastAction.create({
        updatedThing: response.data,
        thing: this.props.thing
      });
    });

    socket.on('DeleteThingActionBroadcastAction', (response) => {
      DeleteThingActionBroadcastAction.create({
        deletedId: response.data,
        thing: this.props.thing
      });
    });
  }

  componentWillUnmount() {
    const {thingIsBeingEdited, thingPriorState, dispatch} = this.props;

    if (thingIsBeingEdited) {
      dispatch(AbortEditingThingAction.create(thingPriorState));
    }
  }

  componentDidMount() {
    const {params, dispatch} = this.props;
    if (params && params.id) {
      dispatch(GetThingAction.create(params.id));
    } else {
      dispatch(InitThingAction.create());
    }
  }

  _setModelValue() {
    const {dispatch} = this.props;
    return function (modelState) {

      console.log(modelState);
      dispatch(SetThingPropertyAction.create(modelState));
      dispatch(SetThingFormPropertyValidityAction.create(modelState));
    };
  }

  _onEditClick() {
    this.props.dispatch(StartEditingThingAction.create(this.props.thing));
  }

  _onSaveClick() {
    const {thing, dispatch} = this.props;

    if (thing && !thing._id) {
      dispatch(CreateThingAction.create(thing));
    } else {
      dispatch(UpdateThingAction.create(thing));
    }
  }

  _onDeleteClick() {
    const {thing, dispatch} = this.props;

    if (thing && thing._id) {
      dispatch(DeleteThingAction.create(thing._id));
    }
  }

  _onAbortClick() {
    const {thingPriorState, dispatch} = this.props;
    dispatch(AbortEditingThingAction.create(thingPriorState));
  }

  render() {
    const {
      container,
      err,
      thingIsBeingEdited,
      thing,
      thingFormState,
      thingWasDeleted,
      thingWasUpdated} = this.props;

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
              thing={thing}
              thingIsBeingEdited={thingIsBeingEdited}
              container={container}/>

          </Col>
          <Form name="thingForm">
            <Col media="lg" gridSize={6}>
              <ThingName
                model={thing}
                isEditable={thingIsBeingEdited}
                formState={thingFormState}
                setModelValue={this._setModelValue()}
              />

              <ThingCategory
                model={thing}
                isEditable={thingIsBeingEdited}
                formState={thingFormState}
                setModelValue={this._setModelValue()}
              />

              <ThingType
                model={thing}
                isEditable={thingIsBeingEdited}
                formState={thingFormState}
                setModelValue={this._setModelValue()}
              />

              <ThingVendor
                model={thing}
                isEditable={thingIsBeingEdited}
                formState={thingFormState}
                setModelValue={this._setModelValue()}
              />

            </Col>
            <Col media="lg" gridSize={6}>
              <ThingDepartment
                model={thing}
                isEditable={thingIsBeingEdited}
                formState={thingFormState}
                setModelValue={this._setModelValue()}
              />

              <ThingUser
                model={thing}
                isEditable={thingIsBeingEdited}
                formState={thingFormState}
                setModelValue={this._setModelValue()}
              />

              <ThingAssetId
                model={thing}
                isEditable={thingIsBeingEdited}
                formState={thingFormState}
                setModelValue={this._setModelValue()}
              />
            </Col>

            <Col media="lg">
              <ModelControls
                isEditable={thingIsBeingEdited}
                isNew={thing && !thing._id}
                isValid={thingFormState.valid}
                onEditClick={this._onEditClick}
                onSaveClick={this._onSaveClick}
                onAbortClick={this._onAbortClick}
                onDeleteClick={this._onDeleteClick}
              />
            </Col>
          </Form>

          <Col media="lg">
            <ThingAlerts thingWasDeleted={thingWasDeleted} thingWasUpdated={thingWasUpdated}/>
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

  return {
    thingFetching: state.thingFetching,
    thingIsBeingEdited: state.thingIsBeingEdited,
    thing: state.thing,
    thingFormState: state.thingFormState,
    thingPriorState: state.thingPriorState,
    thingWasDeleted: state.thingWasDeleted,
    thingWasUpdated: state.thingWasUpdated,
    err: state.err
  };
}

export default connect(select)(ThingContainer);