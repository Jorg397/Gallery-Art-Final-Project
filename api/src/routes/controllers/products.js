require("dotenv").config;
const axios = require("axios");

module.exports = {
  get(req, res) {
    res.send("products");
  },
};
