"use strict";

import React, {Component, PropTypes} from 'react';
import ModelError from './ModelError';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 */
export default class Html5ModelError extends Component {
  render() {
    const {modelState} = this.props;

    if (!modelState || !modelState.$dirty) {
      return(<div></div>);
    }


    return (
      <ModelError modelState={modelState}>
        <badInput>The browser was unable to convert this value</badInput>
        <patternMismatch>The value entered does not match the required pattern</patternMismatch>
        <rangeOverflow>The value entered is greater than the allowed maximum</rangeOverflow>
        <rangeOverflow>The value entered is less than the allowed minimum</rangeOverflow>
        <stepMismatch>The value entered is not evenly divisible by the step value</stepMismatch>
        <tooLong>The length of the value entered exceed the maximum length allowed</tooLong>
        <typeMismatch>The value entered is not in the required syntax for the input</typeMismatch>
        <valueMissing>A value is required</valueMissing>
      </ModelError>
    );
  }
}

Html5ModelError.propTypes = {
  modelState: PropTypes.object
};
