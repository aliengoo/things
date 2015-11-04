"use strict";

import React, {Component, PropTypes} from 'react';

import FormGroup from '../../../../components/form-group';
import ControlLabel from '../../../../components/control-label';

import ThingConfig from '../../thing-config';
import ThingStaticValue from './../outlets/thing-static-value';
import ThingSelect from './thing-select';

export default class ThingType extends Component {
  render() {
    const {thing, thingFormElementState, thingIsBeingEdited, validate, setValue} = this.props;
    const thingProperty = "type";

    // type relies on category being set
    const hasCategory = thing && thing.category;
    const isReallyEditable = hasCategory &&
      ThingConfig.types.hasOwnProperty(thing.category) &&
      thingIsBeingEdited;

    const defaultValue = hasCategory ? "[EMPTY]" : "[CATEGORY NOT SET]";

    return (
      <div className="thing-type">
        <FormGroup formElementState={thingFormElementState} property={thingProperty}>
          <ControlLabel>Type</ControlLabel>
          {isReallyEditable ?
            <ThingSelect
              thing={thing}
              thingProperty={thingProperty}
              options={ThingConfig.types[thing.category]}
              validate={validate}
              setValue={setValue}/> :
            <ThingStaticValue
              thing={thing}
              thingProperty={thingProperty}
              defaultValue={defaultValue}/>
          }
        </FormGroup>
      </div>
    );
  }
}

ThingType.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  category: PropTypes.string,
  thing: PropTypes.object,
  thingFormElementState: PropTypes.object,
  validate: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};