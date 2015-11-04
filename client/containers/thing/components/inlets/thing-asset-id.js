"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../../components/form-group';
import ControlLabel from '../../../../components/control-label';

import ThingStaticValue from './../outlets/thing-static-value';
import ThingTextInput from './thing-text-input';

export default class ThingAssetId extends Component {
  render() {
    const {thing, thingFormElementState, thingIsBeingEdited, setValue, validate} = this.props;
    const thingProperty = "assetId";

    return (
      <div className="thing-assetId">
        <FormGroup>
          <ControlLabel>Asset ID</ControlLabel>
          {thingIsBeingEdited ?
            <ThingTextInput
              thing={thing}
              thingProperty={thingProperty}
              thingFormElementState={thingFormElementState}
              validate={validate}
              setValue={setValue}
            /> :
            <ThingStaticValue thing={thing} thingProperty={thingProperty}/>}
        </FormGroup>
      </div>) ;
  }
}

ThingAssetId.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  thing: PropTypes.object,
  thingFormElementState: PropTypes.object,
  validate: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};

