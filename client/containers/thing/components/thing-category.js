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
    const {thingIsBeingEdited, thing, container} = this.props;

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
    const {thing} = this.props;

    let category = (thing && thing.category) ? thing.category: "[EMPTY]";

    return (
      <div className="thing-viewable">
        <p className="form-control-static">{category}</p>
      </div>
    );
  }

  _renderEditable() {
    const {thingCategory, thing, categories} = this.props;

    let category = (thing && thing.category) ? thing.category: "[EMPTY]";

    let options = categories.map((c, key) =>
      <option value={c} key={key}>{c}</option>);

    return (
      <div className="thing-editable">
        <select name="thingCategory" ref="thingCategory" className="form-control" value={thingCategory} onChange={this._onChange}>
          {options}
        </select>
      </div>
    );
  }
}

ThingCategory.propTypes = {
  thingIsBeingEdited: React.PropTypes.bool,
  container: PropTypes.string,
  thing: PropTypes.object,
  categories: PropTypes.array.isRequired,
  setCategory: PropTypes.func.isRequired
};