const express = require('express');
const router = require('express').Router();
const commentController = require('./controllers/commentUser');
const passport = require("passport");
const { checkRoles } = require("./utils/models/models");


router
.put('/:idComment', commentController.putUser)
.delete('/:idComment',passport.authenticate('jwt', { session: false }),
checkRoles('admin', 'user') ,commentController.delete);


module.exports = router;
