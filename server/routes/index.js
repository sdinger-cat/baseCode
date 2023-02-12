const express = require('express');
const router = express.Router();
const user = require("./users");

const apiIndex = {
  version: 1,
  list: [
    {
      name: "users",
      router: user,
    }
  ],
};

module.exports = apiIndex;
