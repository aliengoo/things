"use strict";

import React, {Component, PropTypes} from 'react';

class PageHeader extends React.Component {
  render() {

    let className = this.props.align === 'center' ? 'text-center' : '';

    return (
      <header className={className}>
        <h1>{this.props.children}</h1>
      </header>
    );
  }
}

PageHeader.propTypes = {
  align: PropTypes.string
};

export default PageHeader;