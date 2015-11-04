"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../../components/form-group';
import ControlLabel from '../../../../components/control-label';

import ThingStaticValue from './../outlets/thing-static-value';
import ThingTextInput from './thing-text-input';

export default class ThingDescription extends Component {
  render() {
    const {thing, thingFormElementState, thingIsBeingEdited, setValue, validate} = this.props;
    const thingProperty = "description";

    return (
      <div className="thing-description">
        <FormGroup formElementState={thingFormElementState} property={thingProperty}>
          <ControlLabel>Description</ControlLabel>
          {thingIsBeingEdited ?
            <ThingTextInput
              thing={thing}
              thingProperty={thingProperty}
              setValue={setValue}
              validate={validate}
              thingFormElementState={thingFormElementState}
            /> :
            <ThingStaticValue
              thing={thing}
              thingProperty={thingProperty}
            />}
        </FormGroup>
      </div>) ;
  }
}

ThingDescription.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  thing: PropTypes.object,
  thingFormElementState: PropTypes.object,
  validate: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};

