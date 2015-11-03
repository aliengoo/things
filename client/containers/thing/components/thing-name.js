"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../../components/form-group';
import ControlLabel from '../../../components/control-label';

export default class ThingName extends Component {

  constructor() {
    super();

    this._onChange = this._onChange.bind(this);
    this._renderEditable = this._renderEditable.bind(this);
    this._renderViewable = this._renderViewable.bind(this);
  }

  _onChange(event) {
    this.props.setName(event.target.value);
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
      <div className="thing-name">
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          {content}
        </FormGroup>
      </div>
    );
  }

  _renderViewable() {
    return (
      <div className="thing-viewable">
        <p className="form-control-static">{this.props.name || "[EMPTY]"}</p>
      </div>
    );
  }

  _renderEditable() {
    return (
      <div className="thing-editable">
        <input type="text" value={this.props.name}  ref="thingName" className="form-control" maxLength={50} onChange={this._onChange}/>
      </div>
    );
  }
}

ThingName.propTypes = {
  thingIsBeingEdited: React.PropTypes.bool.isRequired,
  name: PropTypes.string,
  container: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired
};

