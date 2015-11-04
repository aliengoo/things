"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../../components/form-group';
import ControlLabel from '../../../../components/control-label';

import ThingStaticValue from './../outlets/thing-static-value';
import ThingTextInput from './thing-text-input';
import ErrorHelpBlock from '../../../../components/error-help-block';

export default class ThingName extends Component {

  render() {
    const {thing, thingFormElementState, thingIsBeingEdited, setValue, validate} = this.props;
    const thingProperty = "name";
    const required = true;
    const maxLength = 100;

    let content;

    if (thingIsBeingEdited) {
      content = (
        <div>
          <ThingTextInput
            thing={thing}
            thingProperty={thingProperty}
            setValue={setValue}
            validate={validate}
            required={required}
            maxLength={maxLength}/>
          <ErrorHelpBlock formElementState={thingFormElementState} property={thingProperty}>
            <valueMissing>
              The value is required
            </valueMissing>
          </ErrorHelpBlock>
        </div>
      );
    } else {
      content = <ThingStaticValue thing={thing} thingProperty={thingProperty}/>;
    }

    return (
      <div className="thing-name">
        <FormGroup formElementState={thingFormElementState} property={thingProperty}>
          <ControlLabel>Name</ControlLabel>
          {content}
        </FormGroup>
      </div>);
  }
}

ThingName.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  thing: PropTypes.object,
  thingFormElementState: PropTypes.object,
  validate: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};