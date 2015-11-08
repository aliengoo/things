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

// inlets - they take information in
import ThingConfig from './ThingConfig';

// outlets - send information to the view
import ThingHeader from './components/outlets/ThingHeader';

import ModelContainer from '../../model/ModelContainer';

import ModelFormGroupInlet from '../../model/components/ModelFormGroupInlet';

/**
 * Root container
 */
export default class ThingContainer extends ModelContainer {

  render() {

    let containerModel = this.props.containerModel;

    const {
      fetching,
      editing,
      currentModel,
      previousModel,
      modelFormState,
      externalDelete,
      externalUpdate,
      err
      } = containerModel;

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

            <ModelFormGroupInlet
              label="Name"
              tag="input"
              modelProperty="name"
              defaultValue=""
              html5InputOptions={{"placeholder": "Enter your name"}}
              containerModel={containerModel}
              onChange={super._onModelElementChange()}
            />

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

ThingContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  editing: PropTypes.bool,
  currentModel: PropTypes.object,
  previousModel: PropTypes.object,
  modelFormState: PropTypes.object.isRequired,
  externalDelete: PropTypes.bool,
  externalUpdate: PropTypes.bool,
  err: PropTypes.object
};


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {

  return {
    containerModel: state.thing
  };
}

export default connect(select)(ThingContainer);