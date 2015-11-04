"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../components/form-group';
import ControlLabel from '../../../components/control-label';

import ThingStaticValue from './thing-static-value';
import ThingTextInput from './thing-text-input';
import ErrorHelpBlock from '../../../components/error-help-block';

export default class ThingName extends Component {

  render() {
    const {thing, thingForm, thingIsBeingEdited, setValue, validate} = this.props;
    const thingProperty = "name";
    const required = true;
    const maxLength = 100;

    let content;

    if (thingIsBeingEdited) {
      content = (
        <div>
          <ThingTextInput
            thing={thing}
            thingForm={thingForm}
            thingProperty={thingProperty}
            setValue={setValue}
            validate={validate}
            required={required}
            maxLength={maxLength}/>
          <ErrorHelpBlock validityState={thingForm[thingProperty]}>
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
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          {content}
        </FormGroup>
      </div>);
  }
}

ThingName.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  thingPriorState: PropTypes.object,
  thing: PropTypes.object,
  thingForm: PropTypes.object,
  container: PropTypes.string,
  validate: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};