
"use strict";

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class ModelInlet extends Component {

  constructor(props) {
    super(props);
    this._onChange= this._onChange.bind(this);
  }

  componentDidMount() {
    // force a value on initial load, this sets up the formState for the input
    let timeout = setTimeout(() => {
      this._onChange();
      clearTimeout(timeout);
    }, 1);
  }

  _onChange() {
    const {onChange, modelProperty} = this.props;
    onChange(this.refs[modelProperty]);
  }

  render() {
    const {
      tag,
      options,
      containerModel,
      modelProperty,
      defaultValue,
      html5InputOptions
      } = this.props;

    let curryOptions = {};

    let hasOptions = options && options.length > 0;


    if ((tag === "select" && !hasOptions) || containerModel.fetching) {
      curryOptions.disabled = true;
    }

    let modelState = containerModel.modelFormState[modelProperty];

    let attributes = Object.assign({}, {
        className: "form-control",
        name: modelProperty,
        ref: modelProperty,
        value: containerModel.currentModel[modelProperty],
        defaultValue: defaultValue,
        onChange: this._onChange
      },
      html5InputOptions,
      curryOptions,
      modelState.$attachAttr);

    switch(tag.toLowerCase()) {
      case "input":
      case "textarea":
        return React.createElement(tag, attributes);
      case "select":
        if (hasOptions) {
          let htmlOptions = options.map((o, k) => <option value={o} key={k}>{o}</option>);
          return React.createElement(tag, attributes, htmlOptions);
        } else {
          return React.createElement(tag, attributes);
        }
    }

    return React.createElement(
      <div>
        Element {tag} was not recognised
      </div>);
  }
}

ModelInlet.propTypes = {
  tag: PropTypes.string.isRequired,
  modelProperty: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  // https://developer.mozilla.org/en/docs/Web/HTML/Element/Input
  html5InputOptions: PropTypes.object,
  options: PropTypes.array,
  containerModel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};