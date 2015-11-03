"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../components/form-group';
import ControlLabel from '../../../components/control-label';

export default class ThingCategory extends Component {

  constructor() {
    super();

    this._onChange = this._onChange.bind(this);
    this._renderEditable = this._renderEditable.bind(this);
    this._renderViewable = this._renderViewable.bind(this);
  }

  _onChange(event) {
    this.props.setCategory(event.target.value);
  }

  render() {
    const {thingIsBeingEdited, container} = this.props;

    let content;

    if (thingIsBeingEdited) {
      content = this._renderEditable();
    } else {
      content = this._renderViewable();
    }

    return (
      <div className="thing-category">
        <FormGroup>
          <ControlLabel>Category</ControlLabel>
          {content}
        </FormGroup>
      </div>);
  }

  _renderViewable() {
    return (
      <div className="thing-viewable">
        <p className="form-control-static">{this.props.category || "[EMPTY]"}</p>
      </div>
    );
  }

  _renderEditable() {
    const {category, categories} = this.props;

    let options = categories.map((category, key) =>
      <option value={category} key={key}>{category}</option>);

    return (
      <div className="thing-editable">
        <select name="thingCategory" ref="thingCategory" className="form-control" value={category} onChange={this._onChange}>
          {options}
        </select>
      </div>
    );
  }
}

ThingCategory.propTypes = {
  thingIsBeingEdited: React.PropTypes.bool.isRequired,
  container: PropTypes.string.isRequired,
  category: PropTypes.string,
  categories: PropTypes.array.isRequired,
  setCategory: PropTypes.func.isRequired
};