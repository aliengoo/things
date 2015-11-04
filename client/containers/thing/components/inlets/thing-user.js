"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../../components/form-group';
import ControlLabel from '../../../../components/control-label';

import ThingStaticValue from './../outlets/thing-static-value';
import ThingTextInput from './thing-text-input';

export default class ThingUser extends Component {
  render() {
    const {thing, thingFormElementState, thingIsBeingEdited, setValue, validate} = this.props;
    const thingProperty = "user";

    return (
      <div className="thing-user">
        <FormGroup formElementState={thingFormElementState} property={thingProperty}>
          <ControlLabel>User</ControlLabel>
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

ThingUser.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  thingFormElementState: PropTypes.object,
  thing: PropTypes.object,
  validate: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};

