"use strict";

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getSocket} from '../../api/socket';

import Container from '../../components/container';
import Row from '../../components/row';
import Col from '../../components/col';

import {ContainerChangeAction} from '../actions/common-actions';

import {
  GetThingCategoriesAction,
  SetThingCategoryAction,
  SetThingNameAction,
  SetThingTypeAction,
  UpdateThingActionBroadcastAction,
  DeleteThingActionBroadcastAction
} from './actions/thing-actions';

import ThingConfig from './thing-config';
import ThingHeader from './components/thing-header';
import ThingCategory from './components/thing-category';
import ThingName from './components/thing-name';
import ThingAlerts from './components/thing-alerts';

/**
 * Root container
 */
export default class ThingView extends Component {


  componentWillMount() {
    this.props.dispatch(ContainerChangeAction.create(ThingConfig.container));

    var socket = getSocket();

    socket.on('UpdateThingActionBroadcastAction', (response) => {
      UpdateThingActionBroadcastAction.create(response.data);
    });

    socket.on('DeleteThingActionBroadcastAction', (response) => {
      DeleteThingActionBroadcastAction.create(response.data);
    });
  }

  render() {
    const {
      dispatch,
      err,
      thingFetching,
      thing,
      thingBeingEditedPriorState,
      thingWasDeleted,
      thingWasUpdated} = this.props.dispatch;

    let alert = (<div></div>);

    if (err) {
      alert = (
        <Alert alertType={"danger"}>
          {err}
        </Alert>)
    }

    return (
      <div className="thing-view">
        <Container>
          <ThingHeader thing={thing}/>

          <Col media="lg" size={12}>
            <form name="thingForm">
              <ThingName setName={(name) => dispatch(SetThingNameAction.create(name))}/>
              <ThingCategory
                setCategory={(category) => dispatch(SetThingCategoryAction.create(category))}
                categories={ThingConfig.categories}
              />
              <ThingType setType={(type) => dispatch(SetThingTypeAction.create(type))}
              />
            </form>
          </Col>

          <!-- Container level errors -->
          <Col media="lg" size={12}>
            <ThingAlerts thingWasDeleted={thingWasDeleted} thingWasUpdated={thingWasUpdated}/>
          </Col>

          <!-- Application level errors -->
          <Col  media="lg" size={12}>
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
    thing: state.thing,
    thingBeingEditedPriorState: state.thing,
    err: state.err
  };
}

export default connect(select)(ThingView);