const express = require("express");
const router = require("express").Router();
const customerController = require("./controllers/customer");

router.route("/create").post(customerController.post);

router.route("/login").post(customerController.loginPost);

module.exports = router;
