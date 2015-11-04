"use strict";

import React, {Component, PropTypes} from 'react';

import FormGroup from '../../../components/form-group';
import ControlLabel from '../../../components/control-label';

export default class ThingType extends Component {

  constructor() {
    super();

    this._renderEditable = this._renderEditable.bind(this);
    this._renderViewable = this._renderViewable.bind(this);
  }

  render() {
    const {category, types, thingIsBeingEdited} = this.props;

    let content;

    if (category && types.hasOwnProperty(category) && thingIsBeingEdited) {
      content = this._renderEditable(types[category]);
    } else {
      content = this._renderViewable();
    }

    return (
      <div className="thing-type">
        <FormGroup>
          <ControlLabel>Type</ControlLabel>
          {content}
        </FormGroup>
      </div>
    );
  }

  _renderViewable() {

    const {category, thing} = this.props;

    let thingType = (thing && thing.type) ? thing.type : ["EMPTY"];

    let content;

    if(category) {
      content = <p className="form-control-static">{thingType}</p>;
    } else {
      content = <p className="form-control-static">{"[CATEGORY NOT SET]"}</p>;
    }

    return (
      <div className="thing-viewable">
        {content}
      </div>
    );
  }

  _renderEditable() {

    const {category, thing, types} = this.props;

    let thingType = (thing && thing.type) ? thing.type : [""];

    var categoryTypes = types[category];

    let options = categoryTypes.map((categoryType, key) =>
      <option value={categoryType} key={key}>categoryType</option>);

    return (
      <div className="thing-editable">
        <select value={thingType}  ref="thingName" className="form-control" onChange={this._onChange}>
          {options}
        </select>
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
  setType: PropTypes.func.isRequired
};