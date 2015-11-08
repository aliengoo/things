"use strict";

import React, {Component, PropTypes} from 'react';

export default class ModelsPagination extends Component {
  render() {
    let items = [];

    for(let p = 0; p < page.totalPages; p++) {

    }


    return (
      <nav>
        <ul className="pagination">
          <li>
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>

          </li>
        </ul>
      </nav>
    );
  }
}

ModelsPagination.propTypes = {
  page: PropTypes.object.isRequired
};