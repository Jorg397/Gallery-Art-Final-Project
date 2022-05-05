const express = require("express");
const router = require("express").Router();
const customerController = require("./controllers/customer");
const passport = require("passport");
const { checkRoles } = require("./utils/models/models");

require("./utils/auth");

router.route("/create").post(customerController.post);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  customerController.passport
);

router.route("/googlelogin").post(customerController.googleloginPost);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "employed"),
  customerController.get
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "user", "employed"),
  customerController.getById
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "user", "employed"),
  customerController.put
);

module.exports = router;
