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
// configuration
import ThingConfig from './ThingConfig';


// inlets - they take information in

import ThingDepartment from './components/inlets/ThingDepartment';
import ThingDescription from './components/inlets/ThingDescription';
import ThingName from './components/inlets/ThingName';
import ThingUser from './components/inlets/ThingUser';
import ThingSerialNo from './components/inlets/ThingSerialNo';
import ThingAssetId from './components/inlets/ThingAssetId';
import ThingVendor from './components/inlets/ThingVendor';


// outlets - send information to the view
import ThingHeader from './components/outlets/ThingHeader';
import ModelBroadcastAlerts from '../../model/components/ModelBroadcastAlerts';

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

          <Form name="thingForm">
            <Col gridSize={6}>
              <ThingName
                onChange={this._onModelElementChange()}
                containerModel={containerModel}
              />


              <ThingVendor
                onChange={this._onModelElementChange()}
                containerModel={containerModel}
              />

              <ThingSerialNo
                onChange={this._onModelElementChange()}
                containerModel={containerModel}
              />

              <ThingAssetId
                onChange={this._onModelElementChange()}
                containerModel={containerModel}
              />

            </Col>

            <Col gridSize={6}>

              <ThingDescription
                onChange={this._onModelElementChange()}
                containerModel={containerModel}
              />

              <ThingDepartment
                onChange={this._onModelElementChange()}
                containerModel={containerModel}
              />
              <ThingUser
                onChange={this._onModelElementChange()}
                containerModel={containerModel}
              />
            </Col>

            <Col gridSize={12}>
              <ModelControls
                containerModel={containerModel}
                onEditClick={this._onEditClick}
                onAbortClick={this._onAbortClick}
                onSaveClick={this._onSaveClick}
                onDeleteClick={this._onDeleteClick}
              />
            </Col>

          </Form>


          <Col media="lg">
            <ModelBroadcastAlerts externalDelete={externalDelete} externalUpdate={externalUpdate}/>
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
  containerModel: PropTypes.object.isRequired
};


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {

  return {
    containerModel: state.thing
  };
}

export default connect(select)(ThingContainer);