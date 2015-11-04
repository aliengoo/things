"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../components/form-group';
import ControlLabel from '../../../components/control-label';

import ThingStaticValue from './thing-static-value';
import ThingTextInput from './thing-text-input';

export default class ThingDepartment extends Component {
  render() {
    const {thing, thingForm, thingIsBeingEdited, setValue} = this.props;
    const thingProperty = "department";

    return (
      <div className="thing-department">
        <FormGroup>
          <ControlLabel>Department</ControlLabel>
        {thingIsBeingEdited ?
          <ThingTextInput thing={thing} thingProperty={thingProperty} setValue={setValue} thingForm={thingForm}/> :
          <ThingStaticValue thing={thing} thingProperty={thingProperty}/>}
        </FormGroup>
      </div>) ;
  }
}

ThingDepartment.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  thing: PropTypes.object,
  thingForm: PropTypes.object,
  container: PropTypes.string,
  setValue: PropTypes.func.isRequired
};

