"use strict";

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getSocket} from '../../api/socket';



import NavBar from '../../components/nav-bar';
import Container from '../../components/container';
import Row from '../../components/row';
import Col from '../../components/col';

import {ContainerChangeAction} from '../actions/common-actions';

import {
  AbortEditingThingAction,
  StartEditingThingAction,
  SetThingPropertyAction,
  SetThingFormPropertyValidityAction,
  UpdateThingActionBroadcastAction,
  DeleteThingActionBroadcastAction,
  InitThingAction,
  GetThingAction
} from './actions/thing-actions';

// inlets - they take information in
import ThingConfig from './thing-config';
import ThingCategory from './components/inlets/thing-category';
import ThingName from './components/inlets/thing-name';
import ThingType from './components/inlets/thing-type';
import ThingDescription from './components/inlets/thing-description';
import ThingAssetId from './components/inlets/thing-asset-id';
import ThingDepartment from './components/inlets/thing-department';
import ThingVendor from './components/inlets/thing-vendor';
import ThingUser from './components/inlets/thing-user';

// outlets - send information to the view
import ThingHeader from './components/outlets/thing-header';
import ThingAlerts from './components/outlets/thing-alerts';

// controls - user actions performed on the form
import ThingUpdateBtn from './components/controls/thing-update-btn';
import ThingAbortBtn from './components/controls/thing-abort-btn';
import ThingEditBtn from './components/controls/thing-edit-btn';
import ThingDeleteBtn from './components/controls/thing-delete-btn';

/**
 * Root container
 */
export default class ThingContainer extends Component {

  constructor(props) {
    super(props);

    this._validate = this._validate.bind(this);
    this._setValue = this._setValue.bind(this);
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

  _setValue() {
    const {dispatch} = this.props;
    return function (property, value) {
      let data = {};
      data[property] = value;
      dispatch(SetThingPropertyAction.create(data));
    };
  }

  _validate() {
    const {dispatch, thingPriorState} = this.props;
    return function (property, element) {
      let data = {
        priorState: thingPriorState,
        property: property,
        element: element
      };

      dispatch(SetThingFormPropertyValidityAction.create(data));
    };
  }


  render() {
    const {
      dispatch,
      container,
      err,
      thingFetching,
      thingIsBeingEdited,
      thing,
      thingFormElementState,
      thingPriorState,
      thingWasDeleted,
      thingWasUpdated} = this.props;

    let alert = (<div></div>);

    if (err) {
      alert = (
        <Alert alertType={"danger"}>
          {err}
        </Alert>);
    }
    return (
      <div className="thing-view">
        <NavBar appName="Things"/>
        <Container>
          <Col>
            <ThingHeader thing={thing} thingIsBeingEdited={thingIsBeingEdited} container={container}/>
          </Col>
          <form name="thingFormElementState">
            <Col media="lg" gridSize={6}>
              <ThingName
                thing={thing}
                thingFormElementState={thingFormElementState}
                thingIsBeingEdited={thingIsBeingEdited}
                validate={this._validate()}
                setValue={this._setValue()}
              />

              <ThingCategory
                thing={thing}
                thingFormElementState={thingFormElementState}
                thingIsBeingEdited={thingIsBeingEdited}
                validate={this._validate()}
                setValue={this._setValue()}
              />

              <ThingType
                thing={thing}
                thingFormElementState={thingFormElementState}
                thingIsBeingEdited={thingIsBeingEdited}
                validate={this._validate()}
                setValue={this._setValue()}
              />

              <ThingVendor
                thing={thing}
                thingFormElementState={thingFormElementState}
                thingIsBeingEdited={thingIsBeingEdited}
                validate={this._validate()}
                setValue={this._setValue()}
              />


            </Col>
            <Col media="lg" gridSize={6}>
              <ThingDescription
                thing={thing}
                thingFormElementState={thingFormElementState}
                thingIsBeingEdited={thingIsBeingEdited}
                validate={this._validate()}
                setValue={this._setValue()}/>

              <ThingUser
                thing={thing}
                thingFormElementState={thingFormElementState}
                thingIsBeingEdited={thingIsBeingEdited}
                validate={this._validate()}
                setValue={this._setValue()}
              />

              <ThingDepartment
                thing={thing}
                thingFormElementState={thingFormElementState}
                thingIsBeingEdited={thingIsBeingEdited}
                validate={this._validate()}
                setValue={this._setValue()}
              />


              <ThingAssetId
                thing={thing}
                thingFormElementState={thingFormElementState}
                thingIsBeingEdited={thingIsBeingEdited}
                validate={this._validate()}
                setValue={this._setValue()}
              />

            </Col>
          </form>

          <Col media="lg">
            <ThingEditBtn
              editThing={() => dispatch(StartEditingThingAction.create(thing))}
              thingIsBeingEdited={thingIsBeingEdited}/>

            <ThingAbortBtn
              abortEditingThing={() => dispatch(AbortEditingThingAction.create(thingPriorState))}
              thingIsBeingEdited={thingIsBeingEdited}/>
          </Col>

          <Col media="lg">
            <ThingAlerts thingWasDeleted={thingWasDeleted} thingWasUpdated={thingWasUpdated}/>
          </Col>

          <Col media="lg">
            {alert}
          </Col>
        </Container>
      </div>);

  }

  renderFetching() {
    return (
      <div className="thing-view-fetching">
      </div>
    );
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {

  return {
    thingFetching: state.thingFetching,
    thingIsBeingEdited: state.thingIsBeingEdited,
    thing: state.thing,
    thingFormElementState: state.thingFormElementState,
    thingPriorState: state.thingPriorState,
    thingWasDeleted: state.thingWasDeleted,
    thingWasUpdated: state.thingWasUpdated,
    err: state.err
  };
}

export default connect(select)(ThingContainer);