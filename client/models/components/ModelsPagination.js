"use strict";

import React, {Component, PropTypes} from 'react';

export default class ModelsPagination extends Component {

  render() {

    const {page, setPage} = this.props;

    let items = [];

    for (let p = 1; p <= page.totalPages; p++) {
      if (p === 1) {
        items.push(
          (<li>
            <a href="#" aria-label="Previous" onClick={() => setPage(1)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>)
        );
      }
    }


    return (
      <nav>
        <ul className="pagination">

        </ul>
      </nav>
    );
  }
}

ModelsPagination.propTypes = {
  page: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired
};