"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../components/form-group';
import ControlLabel from '../../../components/control-label';

import ThingStaticValue from './thing-static-value';
import ThingTextInput from './thing-text-input';

export default class ThingUser extends Component {
  render() {
    const {thing, thingForm, thingIsBeingEdited, setValue} = this.props;
    const thingProperty = "user";

    return (
      <div className="thing-user">
        <FormGroup>
          <ControlLabel>User</ControlLabel>
          {thingIsBeingEdited ?
            <ThingTextInput thing={thing} thingProperty={thingProperty} setValue={setValue} thingForm={thingForm}/> :
            <ThingStaticValue thing={thing} thingProperty={thingProperty}/>}
        </FormGroup>
      </div>) ;
  }
}

ThingUser.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  thingForm: PropTypes.object,
  thing: PropTypes.object,
  container: PropTypes.string,
  setValue: PropTypes.func.isRequired
};

