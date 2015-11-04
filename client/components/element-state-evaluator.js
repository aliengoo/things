"use strict";

import _ from 'lodash';

export function evaluate(element, previousValue) {
  element.checkValidity();

  let eq = _.isEqual(previousValue, element.value);

  return Object.assign({}, {
    $validity: element.validity,
    $pristine: eq,
    $dirty: !eq
  });

}
