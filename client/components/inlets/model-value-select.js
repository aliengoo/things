"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import FormGroup from './../outlets/form-group';
import ControlLabel from './../outlets/control-label';
import ModelValueStatic from './../outlets/model-value-static';

export default class ModelValueSelect extends Component {

  constructor(props) {
    super(props);

    this._renderEditable = this._renderEditable.bind(this);
    this._setModelValue = this._setModelValue.bind(this);
  }

  componentDidMount() {
    const {setModelValue, modelProperty} = this.props;

    let validationTimeout = setTimeout(() => {
      setModelValue(modelProperty, this.refs[modelProperty]);
      clearTimeout(validationTimeout);
    }, 1);
  }

  render() {
    const {
      label,
      isEditable,
      model,
      modelProperty,
      defaultValue
      } = this.props;

    return isEditable ?
      this._renderEditable() :
      <ModelValueStatic label={label} model={model} modelProperty={modelProperty} defaultValue={defaultValue}/>;
  }

  _setModelValue() {
    const {setModelValue, modelProperty} = this.props;
    setModelValue(modelProperty, this.refs[modelProperty]);
  }

  _renderEditable() {
    const {
      label,
      options,
      model,
      modelProperty,
      defaultValue,
      html5InputOptions
      } = this.props;

    let curryOptions = {};

    if (!options || options.length === 0) {
      curryOptions.disabled = true;
    }

    let attributes = Object.assign({}, {
        className: "form-control",
        ref: modelProperty,
        name: modelProperty,
        value: model[modelProperty],
        defaultValue: defaultValue,
        onChange: this._setModelValue
      },
      html5InputOptions,
      curryOptions);

    let htmlOptions = options.map((o, k) => <option value={o} key={k}>{o}</option>);

    let select = React.createElement("select", attributes, htmlOptions);

    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        {select}
      </FormGroup>
    );
  }
}

ModelValueSelect.propTypes = {
  // ControlLabel value
  label: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  // https://developer.mozilla.org/en/docs/Web/HTML/Element/Input
  html5InputOptions: PropTypes.object,
  formState: PropTypes.object,
  // The parent model
  model: PropTypes.object,
  // The parent model property
  modelProperty: PropTypes.string.isRequired,
  // output from component
  setModelValue: PropTypes.func.isRequired,
  isEditable: PropTypes.bool
};

ModelValueSelect.defaultProps = {
  label: "Label property missing",
  model: {},
  options: [],
  formState: {},
  html5InputOptions: {
    type: "text",
    required: false,
    disabled: false
  },
  debounce: 0
};
