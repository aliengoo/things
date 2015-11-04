"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../../components/form-group';
import ControlLabel from '../../../../components/control-label';

import ThingStaticValue from './../outlets/thing-static-value';
import ThingTextInput from './thing-text-input';

export default class ThingDepartment extends Component {
  render() {
    const {thing, thingFormElementState, thingIsBeingEdited, setValue, validate} = this.props;
    const thingProperty = "department";

    return (
      <div className="thing-department">
        <FormGroup formElementState={thingFormElementState} property={thingProperty}>
          <ControlLabel>Department</ControlLabel>
        {thingIsBeingEdited ?
          <ThingTextInput
            thing={thing}
            thingProperty={thingProperty}
            thingFormElementState={thingFormElementState}
            setValue={setValue}
            validate={validate}
          /> :
          <ThingStaticValue thing={thing} thingProperty={thingProperty}/>}
        </FormGroup>
      </div>) ;
  }
}

ThingDepartment.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  thing: PropTypes.object,
  thingFormElementState: PropTypes.object,
  validate: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};

