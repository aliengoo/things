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
  SetThingCategoryAction,
  SetThingNameAction,
  SetThingTypeAction,
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
import ThingAlerts from './components/thing-alerts';

import ThingUpdateBtn from './components/thing-update-btn';
import ThingAbortBtn from './components/thing-abort-btn';
import ThingEditBtn from './components/thing-edit-btn';
import ThingDeleteBtn from './components/thing-delete-btn';

/**
 * Root container
 */
export default class ThingContainer extends Component {
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

  render() {
    const {
      container,
      dispatch,
      err,
      thingFetching,
      thingIsBeingEdited,
      thing,
      thingPriorState,
      thingWasDeleted,
      thingWasUpdated} = this.props.dispatch;

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
          <ThingHeader thing={thing} thingIsBeingEdited={thingIsBeingEdited} container={container}/>

          <Col media="lg" size={12}>
            <form name="thingForm">
              <ThingName
                thing={thing}
                container={container}
                thingIsBeingEdited={thingIsBeingEdited}
                setName={(name) => dispatch(SetThingNameAction.create(name))}/>

              <ThingCategory
                thing={thing}
                container={container}
                thingIsBeingEdited={thingIsBeingEdited}
                setCategory={(category) => dispatch(SetThingCategoryAction.create(category))}
                categories={ThingConfig.categories}
              />

              <ThingType
                thing={thing}
                container={container}
                types={ThingConfig.types}
                thingIsBeingEdited={thingIsBeingEdited}
                setType={(type) => dispatch(SetThingTypeAction.create(type))}
              />
            </form>
          </Col>

          <Col media="lg" size={12}>
            <ThingEditBtn
              editThing={() => dispatch(StartEditingThingAction.create(thing))}
              thingIsBeingEdited={thingIsBeingEdited}/>

            <ThingAbortBtn
              abortEditingThing={() => dispatch(AbortEditingThingAction.create(thingPriorState))}
              thingIsBeingEdited={thingIsBeingEdited}/>
          </Col>

          <Col media="lg" size={12}>
            <ThingAlerts thingWasDeleted={thingWasDeleted} thingWasUpdated={thingWasUpdated}/>
          </Col>

          <Col media="lg" size={12}>
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
    thingPriorState: state.thingPriorState,
    thingWasDeleted: state.thingWasDeleted,
    thingWasUpdated: state.thingWasUpdated,
    err: state.err
  };
}

export default connect(select)(ThingContainer);