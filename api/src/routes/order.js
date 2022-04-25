const express = require('express');
const router = require('express').Router();
const productController = require('./controllers/order.js');

router
    .route('/:idOrder')
    .get(productController.get);


module.exports = router;