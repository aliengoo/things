"use strict";

import React, {Component, PropTypes} from 'react';

export default class ModelsPagination extends Component {

  render() {

    const {page, setPage} = this.props;

    let items = [];

    // the beginning
    if (page.current === 1) {
      items.push(
        (<li className="disabled">
          <a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>)
      );
    } else {
      const previousPage = page.current - 1;

      items.push(
        (<li>
          <a href="#" aria-label="Previous" onClick={() => setPage(previousPage)}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>)
      );
    }

    // the middle
    for (let p = 1; p <= page.totalPages; p++) {
      let isCurrentPage = p === page.current;

      if (isCurrentPage) {
        items.push(
          <li class="active">
            <span>{p}</span>
          </li>
        );
      } else {
        items.push(
          <li>
            <a href="#" onClick={() => setPage(p)}>{p}</a>
          </li>
        );
      }
    }

    // the end
    if (page.current === page.totalPages) {
      items.push(
        (<li className="disabled">
          <a href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>)
      );
    } else {
      const nextPage = page.current + 1;

      items.push(
        (<li>
          <a href="#" aria-label="Next" onClick={() => setPage(nextPage)}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>)
      );
    }

    return (
      <nav>
        <ul className="pagination">
          {items.map((item) => item)}
        </ul>
      </nav>
    );
  }
}

ModelsPagination.propTypes = {
  page: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired
};