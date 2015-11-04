"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../../components/form-group';
import ControlLabel from '../../../../components/control-label';

import ThingStaticValue from './../outlets/thing-static-value';
import ThingTextInput from './thing-text-input';

export default class ThingVendor extends Component {
  render() {
    const {thing, validate, thingFormElementState, thingIsBeingEdited, setValue} = this.props;
    const thingProperty = "vendor";

    return (
      <div className="thing-vendor">
        <FormGroup>
          <ControlLabel>Vendor</ControlLabel>
          {thingIsBeingEdited ?
            <ThingTextInput
              thing={thing}
              thingProperty={thingProperty}
              thingFormElementState={thingFormElementState}
              validate={validate}
              setValue={setValue}
            /> :
            <ThingStaticValue
              thing={thing}
              thingProperty={thingProperty}
            />}
        </FormGroup>
      </div>) ;
  }
}

ThingVendor.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  thingFormElementState: PropTypes.object,
  thing: PropTypes.object,
  validate: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};

