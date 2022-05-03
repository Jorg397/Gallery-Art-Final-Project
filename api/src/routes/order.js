const express = require('express');
const router = require('express').Router();
const productController = require('./controllers/order.js');
const passport = require('passport');
const { checkRoles } = require('./utils/models/models.js');

router.get('/:idOrder',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    productController.get);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    productController.post);


router.put('/:idOrder', 
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    productController.put);

router.put('/status/:idOrder',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin'),
    productController.putStatus);

router.delete('/:idOrder',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    productController.delete);


module.exports = router;