"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../components/form-group';
import ControlLabel from '../../../components/control-label';

import ThingStaticValue from './thing-static-value';
import ThingSelect from './thing-select';

export default class ThingCategory extends Component {

  render() {
    const {thingIsBeingEdited, thing, categories, setValue} = this.props;
    const thingProperty = "category";

    return (
      <div className="thing-category">
        <FormGroup>
          <ControlLabel>Category</ControlLabel>
          {thingIsBeingEdited ?
            <ThingSelect thing={thing} thingProperty={thingProperty} options={categories} setValue={setValue}/> :
            <ThingStaticValue thing={thing} thingProperty={thingProperty}/>}
        </FormGroup>
      </div>);
  }
}

ThingCategory.propTypes = {
  thingIsBeingEdited: React.PropTypes.bool,
  container: PropTypes.string,
  thing: PropTypes.object,
  categories: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired
};