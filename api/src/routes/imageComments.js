const express = require('express');
const router = require('express').Router();
const imageComments = require('./controllers/imageComments');
const passport = require('passport');
const { checkRoles } = require('./utils/models/models');


router.post('/', 
    passport.authenticate('jwt', { session: false }),
    checkRoles("admin", "user"),
    imageComments.post);

module.exports = router;   

