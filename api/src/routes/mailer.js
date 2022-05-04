const express = require("express");
const router = require("express").Router();

const controllerMailer = require("./controllers/mailer")

//routes.use("/nodeMailer", NodeMailer);

router
.route('/')
.post(controllerMailer.post)

router.post(
    "/resetPassword",
    controllerMailer.resetPassword
)

router.post(
    "/changePassword",
    controllerMailer.changePassword)


module.exports = router;