const express = require("express");
const router = require("express").Router();
const commentController = require("./controllers/comment");
const passport = require("passport");
const { checkRoles } = require("./utils/models/models");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  checkRoles("user", "admin", "employed"),
  commentController.post
);

router.post('/',passport.authenticate('jwt', { session: false }),
checkRoles('admin', 'user'), commentController.post)
.put('/:idComment',passport.authenticate('jwt', { session: false }),
checkRoles('admin', 'employed') ,commentController.putAdmin)


module.exports = router;
