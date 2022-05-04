
const express = require("express");
const router = require("express").Router();
const commentController = require("./controllers/commentUser");
const passport = require("passport");
const { checkRoles } = require("./utils/models/models");

router.put(
  "/:idComment",
  passport.authenticate("jwt", { session: false }),
  checkRoles("user", "admin", "employed"),
  commentController.putUser
);

router.delete(
  "/:idComment",
  passport.authenticate("jwt", { session: false }),
  checkRoles("user", "admin", "employed"),
  commentController.delete
);

module.exports = router;
