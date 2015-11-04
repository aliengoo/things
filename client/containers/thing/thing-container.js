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

import ThingConfig from './thing-config';
import ThingHeader from './components/thing-header';
import ThingCategory from './components/thing-category';
import ThingName from './components/thing-name';
import ThingType from './components/thing-type';
import ThingDescription from './components/thing-description';
import ThingAssetId from './components/thing-asset-id';
import ThingDepartment from './components/thing-department';
import ThingAlerts from './components/thing-alerts';
import ThingVendor from './components/thing-vendor';
import ThingUser from './components/thing-user';

import ThingUpdateBtn from './components/thing-update-btn';
import ThingAbortBtn from './components/thing-abort-btn';
import ThingEditBtn from './components/thing-edit-btn';
import ThingDeleteBtn from './components/thing-delete-btn';

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
    if (this.props.params.id) {
      this.props.dispatch(GetThingAction.create(this.props.params.id));
    } else {
      this.props.dispatch(InitThingAction.create());
    }
  }

  _setValue(property) {
    const {dispatch} = this.props;
    return function (value) {
      let data = {};
      data[property] = value;
      dispatch(SetThingPropertyAction.create(data));
    };
  }

  _validate(property) {
    const {dispatch} = this.props;
    return function(element) {
      let data = {
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
      thingForm,
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
          <form name="thingForm">
            <Col media="lg" gridSize={6}>
              <ThingName
                thing={thing}
                thingForm={thingForm}
                validate={this._validate("name")}
                container={container}
                thingIsBeingEdited={thingIsBeingEdited}
                setValue={this._setValue("name")}
              />

              <ThingCategory
                thing={thing}
                thingForm={thingForm}
                thingIsBeingEdited={thingIsBeingEdited}
                validate={this._validate("category")}
                setValue={this._setValue("category")}
                container={container}
                categories={ThingConfig.categories}
              />

              <ThingType
                thing={thing}
                thingForm={thingForm}
                validate={this._validate("type")}
                container={container}
                types={ThingConfig.types}
                thingIsBeingEdited={thingIsBeingEdited}
                setValue={this._setValue("type")}
              />

              <ThingVendor
                thing={thing}
                thingForm={thingForm}
                validate={this._validate("vendor")}
                container={container}
                thingIsBeingEdited={thingIsBeingEdited}
                setValue={this._setValue("vendor")}
              />


            </Col>
            <Col media="lg" gridSize={6}>
              <ThingDescription
                thing={thing}
                thingForm={thingForm}
                validate={this._validate("description")}
                container={container}
                thingIsBeingEdited={thingIsBeingEdited}
                setValue={this._setValue("description")}/>

              <ThingUser
                thing={thing}
                thingForm={thingForm}
                validate={this._validate("user")}
                container={container}
                thingIsBeingEdited={thingIsBeingEdited}
                setValue={this._setValue("user")}
              />

              <ThingDepartment
                thing={thing}
                thingForm={thingForm}
                validate={this._validate("department")}
                container={container}
                thingIsBeingEdited={thingIsBeingEdited}
                setValue={this._setValue("department")}
              />


              <ThingAssetId
                thing={thing}
                thingForm={thingForm}
                validate={this._validate("assetId")}
                container={container}
                thingIsBeingEdited={thingIsBeingEdited}
                setValue={this._setValue("assetId")}
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
    thingForm: state.thingForm,
    thingPriorState: state.thingPriorState,
    thingWasDeleted: state.thingWasDeleted,
    thingWasUpdated: state.thingWasUpdated,
    err: state.err
  };
}

export default connect(select)(ThingContainer);