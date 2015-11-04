"use strict";

import React, {Component, PropTypes} from 'react';
export default class Form extends Component {
  render() {



    return (
      <form>

      </form>);

  }
}

Form.propTypes = {
  onValidityChange: PropTypes.func.isRequired,
  formElementState: PropTypes.object
};



