"use strict";

import React, {Component, PropTypes} from 'react';
import ErrorHelpBlock from '../../../../components/error-help-block';
import FormGroup from '../../../../components/form-group';
import ControlLabel from '../../../../components/control-label';
import ThingConfig from '../../thing-config';

import ThingStaticValue from './../outlets/thing-static-value';
import ThingSelect from './thing-select';

export default class ThingCategory extends Component {

  render() {
    const {thingIsBeingEdited, thingFormElementState, thing, validate, setValue} = this.props;
    const thingProperty = "category";
    const required = true;

    return (
      <div className="thing-category">
        <FormGroup formElementState={thingFormElementState} property={thingProperty}>
          <ControlLabel>Category</ControlLabel>
          {thingIsBeingEdited ?
            ( <div>
                <ThingSelect
                  required={required}
                  thing={thing}
                  thingProperty={thingProperty}
                  options={ThingConfig.categories}
                  validate={validate}
                  setValue={setValue}/>
                <ErrorHelpBlock formElementState={thingFormElementState} property={thingProperty}>
                  <valueMissing>
                    Category is required
                  </valueMissing>
                </ErrorHelpBlock>
              </div>
            ) :
            <ThingStaticValue
              thing={thing}
              thingProperty={thingProperty}/>}
        </FormGroup>
      </div>);
  }
}

ThingCategory.propTypes = {
  thingIsBeingEdited: React.PropTypes.bool,
  thing: PropTypes.object,
  thingFormElementState: PropTypes.object,
  validate: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};