"use strict";

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react';
import {connect} from 'react-redux';

import ModelControls from '../../model/components/ModelControls';
import NavBar from '../../components/outlets/NavBar';
import Form from '../../components/outlets/form';
import Container from '../../components/layout/container';
import Row from '../../components/layout/row';
import Col from '../../components/layout/col';
import ModelBroadcastAlerts from '../../model/components/ModelBroadcastAlerts';

import ModelsContainer from '../../models/ModelsContainer';

export default class ThingsContainer extends ModelsContainer {

  setPage(page) {

  }

  render() {

  }
}
ThingsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  containerModel: PropTypes.object.isRequired
};


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {

  return {
    containerModel: state.things
  };
}

export default connect(select)(ThingsContainer);