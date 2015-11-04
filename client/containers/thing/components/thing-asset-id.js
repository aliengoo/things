"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../components/form-group';
import ControlLabel from '../../../components/control-label';

import ThingStaticValue from './thing-static-value';
import ThingTextInput from './thing-text-input';

export default class ThingAssetId extends Component {
  render() {
    const {thing, thingForm, thingIsBeingEdited, setValue} = this.props;
    const thingProperty = "assetId";

    return (
      <div className="thing-assetId">
        <FormGroup>
          <ControlLabel>Asset ID</ControlLabel>
          {thingIsBeingEdited ?
            <ThingTextInput thing={thing} thingProperty={thingProperty} setValue={setValue} thingForm={thingForm}/> :
            <ThingStaticValue thing={thing} thingProperty={thingProperty}/>}
        </FormGroup>
      </div>) ;
  }
}

ThingAssetId.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  thing: PropTypes.object,
  thingForm: PropTypes.object,
  container: PropTypes.string,
  setValue: PropTypes.func.isRequired
};

