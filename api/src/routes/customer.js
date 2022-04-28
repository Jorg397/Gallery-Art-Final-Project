const express = require("express");
const router = require("express").Router();
const customerController = require("./controllers/customer");
const passport = require('passport');

require('./utils/auth');

router.route("/create").post(customerController.post);

router.post( '/login' ,
    passport.authenticate('local', { session: false }),
    customerController.passport);

router.route("/googlelogin").post(customerController.googleloginPost);

router.get("/",customerController.get);

router.get("/:id",customerController.getById);

router.put("/:id",customerController.put);

module.exports = router;
