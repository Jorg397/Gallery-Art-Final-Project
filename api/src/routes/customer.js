const express = require("express");
const router = require("express").Router();
const customerController = require("./controllers/customer");
const passport = require('passport');

require('./utils/auth');

router.route("/create").post(customerController.post);

router.route("/login").post(customerController.loginPost);

router.post( '/prueba' ,
    passport.authenticate('local', { session: false }),
    customerController.passport);

module.exports = router;
