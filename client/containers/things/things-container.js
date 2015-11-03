"use strict";

import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {getSocket} from '../../api/socket';

import ContainerFluid from '../../components/container-fluid';
import PageHeader from '../../components/page-header';
import Row from '../../components/row';
import Col from '../../components/col';
import FlexRow from '../../components/flex-row';
import FlexColumn from '../../components/flex-column';

import {ContainerChangeAction} from '../actions/common-actions';

import ThingsConfig from './things-config';

import ThingsFilter from './components/things-filter';
import ThingTable from './components/things-table';
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
  }

  _openThing(id) {
    //TODO: Open thing
  }

  render() {
    const {thingsPagination, things, thingsFilter} = this.props;

    return (
      <div class="things-container">
        <ContainerFluid>
          <PageHeader>Things</PageHeader>
          <FlexRow>
            <ThingsFilter thingsFilter={thingsFilter}/>
            <FlexColumn>
              <ThingsTable things={things} openThing={(id) => this._openThing(id)}/>
              <ThingsPagination thingsPagination={thingsPagination}/>
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
    thingsPagination: state.thingsPagination,
    things: state.things,
    thingsFilter: state.thingsFilter,
    err: state.err
  };
}

export default connect(select)(ThingsContainer);