const express = require("express");
const router = require("express").Router();

const controllerMailer = require("./controllers/mailer");

router.route("/").post(controllerMailer.post);

module.exports = router;
