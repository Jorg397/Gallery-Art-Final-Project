const express = require('express');
const router = require('express').Router();
const cartController = require('./controllers/cart');
const passport = require('passport');
const { checkRoles } = require('./utils/models/models');

router.route("/:idcart").get(cartController.get);


router.put('/:idcart',
    // passport.authenticate('jwt', { session: false }),
    // checkRoles( 'admin' ),
    cartController.put);

router.route("/:idcustomer").post(cartController.post);

module.exports = router;
