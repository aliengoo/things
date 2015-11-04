"use strict";

import React, {Component, PropTypes} from 'react';

import FormGroup from '../../../components/form-group';
import ControlLabel from '../../../components/control-label';

import ThingStaticValue from './thing-static-value';
import ThingSelect from './thing-select';

export default class ThingType extends Component {
  render() {
    const {thing, types, thingIsBeingEdited, setValue} = this.props;
    const thingProperty = "type";

    // type relies on category being set
    const hasCategory = thing && thing.category;
    const isReallyEditable = hasCategory &&
      types.hasOwnProperty(thing.category) &&
      thingIsBeingEdited;

    const defaultValue = hasCategory ? "[EMPTY]" : "[CATEGORY NOT SET]";

    return (
      <div className="thing-type">
        <FormGroup>
          <ControlLabel>Type</ControlLabel>
          {isReallyEditable ?
            <ThingSelect thing={thing} thingProperty={thingProperty} options={types[thing.category]}
                         setValue={setValue}/> :
            <ThingStaticValue thing={thing} thingProperty={thingProperty} defaultValue={defaultValue}/>
          }
        </FormGroup>
      </div>
    );
  }
}

ThingType.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  container: PropTypes.string,
  category: PropTypes.string,
  thing: PropTypes.object,
  types: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired
};