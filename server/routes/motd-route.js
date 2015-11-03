"use strict";

module.exports = function init(app) {
  app.get("/motd", (req, res) => {
    res.json({
      "message": "Hello"
    });
  });
};