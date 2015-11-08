"use strict";

module.exports.calculate = function (page, count) {
  if (count < 1) {
    page.current = 0;
    page.totalPages = 0;
  }

  page.limit = page.limit || 10;

  let remainder = count % page.limit;

  page.totalItems = count;
  page.totalPages = parseInt((count / page.limit) + (remainder > 0 ? 1 : 0));

  page.current = page.current < 1 ? 1 : page.current;

  if (page.totalPages < page.current) {
    page.current = page.totalPages;
  }

  if (page.current > 0) {
    page.skip = (page.current - 1) * page.limit;
  }

  return page;
};
