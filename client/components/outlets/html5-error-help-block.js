"use strict";

import React, {Component, PropTypes} from 'react';
import ErrorHelpBlock from './../outlets/error-help-block';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 */
export default class Html5ErrorHelpBlock extends Component {
  render() {
    const {formState, property} = this.props;

    if (formState && formState.hasOwnProperty(property) && !formState[property].$dirty) {
      return(<div></div>);
    }

    return (
      <ErrorHelpBlock formState={formState} property={property}>
        <badInput>The browser was unable to convert this value</badInput>
        <patternMismatch>The value entered does not match the required pattern</patternMismatch>
        <rangeOverflow>The value entered is greater than the allowed maximum</rangeOverflow>
        <rangeOverflow>The value entered is less than the allowed minimum</rangeOverflow>
        <stepMismatch>The value entered is not evenly divisible by the step value</stepMismatch>
        <tooLong>The length of the value entered exceed the maximum length allowed</tooLong>
        <typeMismatch>The value entered is not in the required syntax for the input</typeMismatch>
        <valueMissing>A value is required</valueMissing>
      </ErrorHelpBlock>
    );
  }
}

Html5ErrorHelpBlock.propTypes = {
  formState: PropTypes.object,
  property: PropTypes.string.isRequired
};
