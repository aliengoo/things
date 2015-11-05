"use strict";

import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {getSocket} from '../../api/socket';

import ContainerFluid from '../../components/layout/container-fluid';
import PageHeader from '../../components/outlets/page-header';
import Row from '../../components/layout/row';
import Col from '../../components/layout/col';
import FlexRow from '../../components/layout/flex-row';
import FlexColumn from '../../components/layout/flex-column';

import {ContainerChangeAction} from '../actions/common-actions';

import ThingsConfig from './things-config';

import {FindThingsAction} from './actions/things-actions';

import {
  CreateThingActionBroadcastAction,
  DeleteThingActionBroadcastAction,
  UpdateThingActionBroadcastAction,
} from '../thing/actions/thing-actions';

import ThingsFilter from './components/things-filter';
import ThingsTable from './components/things-table';
import ThingsPagination from './components/things-pagination';

/**
 * Root container
 */
export default class ThingsContainer extends Component {
  constructor() {
    super();
    this._openThing = this._openThing.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(ContainerChangeAction.create(ThingsConfig.container));

    var socket = getSocket();

    var refresh = () => {
      this.props.dispatch(FindThingsAction.create(this.props.thingsFilter));
    };

    // refresh list on external change
    socket.on(CreateThingActionBroadcastAction.type, refresh);
    socket.on(DeleteThingActionBroadcastAction.type, refresh);
    socket.on(UpdateThingActionBroadcastAction.type, refresh);
  }

  componentDidMount() {
    const {thingsFilter} = this.props;

    this.props.dispatch(FindThingsAction.create(thingsFilter));
  }

  _openThing(id) {
    //TODO: Open thing
  }

  render() {
    const {thingsPage, things, thingsFilter} = this.props;

    return (
      <div className="things-container">
        <ContainerFluid>
          <PageHeader>Things</PageHeader>
          <FlexRow>
            <ThingsFilter thingsFilter={thingsFilter}/>
            <FlexColumn>
              <ThingsTable things={things} openThing={(id) => this._openThing(id)}/>
              <ThingsPagination thingsPage={thingsPage}/>
            </FlexColumn>

          </FlexRow>
        </ContainerFluid>
      </div>);
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {

  return {
    thingsFetching: state.thingsFetching,
    thingsPage: state.thingsPage,
    things: state.things,
    thingsFilter: state.thingsFilter,
    err: state.err
  };
}

export default connect(select)(ThingsContainer);