"use strict";

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react';
import {connect} from 'react-redux';

import ModelControls from '../../model/components/ModelControls';
import NavBar from '../../components/outlets/NavBar';
import Form from '../../components/outlets/form';
import ContainerFluid from '../../components/layout/container-fluid';
import Row from '../../components/layout/row';
import Col from '../../components/layout/col';

import ModelsContainer from '../../models/ModelsContainer';
import ModelsPagination from '../../models/components/ModelsPagination';

import ThingsFilter from './components/ThingsFilter';
import ThingsTable from './components/ThingsTable';

export default class ThingsContainer extends ModelsContainer {

  render() {
    const {containerModel} = this.props;

    return (
      <div className="things-view">
        <NavBar appName="Things"/>
        <ContainerFluid>
          <Col gridSize={2}>
            <ThingsFilter filter={currentModel.filter} applyFilter={this.applyFilter}/>
          </Col>

          <Col gridSize={10}>
            <ThingsTable currentModels={containerModel.currentModels}>
            </ThingsTable>
            <ModelsPagination page={containerModel.filter.page} setPage={this.setPage}/>
          </Col>
        </ContainerFluid>

      </div>
    );
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