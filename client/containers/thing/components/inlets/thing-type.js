"use strict";

import React, {Component, PropTypes} from 'react';
import ModelValueSelect from '../../../../components/inlets/model-value-select';
import ThingConfig from '../../thing-config';

export default class ThingType extends Component {
  render() {
    const {
      isEditable,
      model,
      formState,
      setModelValue
      } = this.props;

    // information specific to type selector
    const hasCategory = !!model && model.category;
    const hasTypesForCategory = hasCategory && ThingConfig.types.hasOwnProperty(model.category);
    const typeOptions = hasTypesForCategory ? ThingConfig.types[model.category] : [];
    const typeDefaultValue = hasCategory ? "[EMPTY]" : "[CATEGORY NOT SET]";

    return (
      <ModelValueSelect
        label="Type"
        options={typeOptions}
        model={model}
        modelProperty="type"
        isEditable={isEditable}
        formState={formState}
        setModelValue={setModelValue}
        defaultValue={typeDefaultValue}
        html5InputOptions={{"required": true}}
      />);
  }
}

ThingType.propTypes = {
  model: PropTypes.object,
  isEditable: PropTypes.bool,
  formState: PropTypes.object,
  setModelValue: PropTypes.func.isRequired
};