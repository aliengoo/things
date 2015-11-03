"use strict";

import React from 'react';

import FormGroup from '../../../components/form-group';
import ControlLabel from '../../../components/control-label';

export default class ThingType extends React.Component {

  constructor() {
    super();

    this._renderBasedOnCategory = this._renderBasedOnCategory.bind(this);
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

    const {category} = this.props;

    let content;

    if(category) {
      content = <p className="form-control-static">{this.props.type || "[EMPTY]"}</p>;
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

    const {category, types} = this.props;

    var categoryTypes = types[category];

    let options = categoryTypes.map((categoryType, key) =>
      <option value={categoryType} key={key}>categoryType</option>);

    return (
      <div className="thing-editable">
        <select value={this.props.type}  ref="thingName" className="form-control" onChange={this._onChange}>
          {options}
        </select>
      </div>
    );
  }
}

ThingType.propTypes = {
  thingIsBeingEdited: React.PropTypes.bool.isRequired,
  container: PropTypes.string.isRequired,
  category: React.PropTypes.string,
  type: React.PropTypes.string,
  types: React.PropType.object.isRequired,
  setType: React.PropTypes.func.isRequired
};