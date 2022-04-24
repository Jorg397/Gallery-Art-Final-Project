const express = require("express");
const router = require("express").Router();
const customerController = require("./controllers/customer");
const middleware = require("../middleware/protectRoutes");

router.route("/create").post(customerController.post);

router.route("/login").post(customerController.loginPost);

router.route("/googlelogin").post(customerController.googleloginPost);

//protect routes with middleware in customer

router.use(middleware.protectRoutes);

router.route("/perfil").get(customerController.get);

module.exports = router;
