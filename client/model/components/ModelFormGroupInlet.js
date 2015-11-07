import React, {Component, PropTypes} from 'react';
import ModelInlet from './ModelInlet';
import FormGroup from '../../components/outlets/form-group';
import ControlLabel from '../../components/outlets/control-label';

export default class ModelFormGroupInlet extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {
      tag,
      modelProperty,
      defaultValue,
      html5InputOptions,
      containerModel,
      onChange
      } = this.props;

    let content;

    if (this.editable) {
      content =
        (<ModelInlet
          tag={tag}
          modelProperty={modelProperty}
          defaultValue={defaultValue}
          html5InputOptions={html5InputOptions}
          containerModel={containerModel}
          onChange={onChange}
        />)
    } else {

    }
  }
}

ModelFormGroupInlet.propTypes = {
  tag: PropTypes.string.isRequired,
  modelProperty: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  // https://developer.mozilla.org/en/docs/Web/HTML/Element/Input
  html5InputOptions: PropTypes.object,
  containerModel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
