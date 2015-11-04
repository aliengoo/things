"use strict";

export default {
  container: "thing",
  categories: ["Hardware", "Software"],
  validation: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100
    },
    category: {
      required: true
    },
    type: {
      required: true
    },
    vendor: {},
    description: {},
    user: {},
    department: {},
    assetId: {}
  },

  // mapped to categories
  types: {
    "Hardware": [
      "desktop",
      "keyboard",
      "mobile",
      "monitor",
      "mouse",
      "server",
      "telephone",
      "other"
    ],

    "Software": [
      "database",
      "database-tool",
      "operating-system",
      "developer-tool",
      "web-server",
      "email-client",
      "email-server",
      "other"
    ]
  }
};