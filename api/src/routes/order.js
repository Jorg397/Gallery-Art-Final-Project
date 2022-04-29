const express = require('express');
const router = require('express').Router();
const orderController = require('./controllers/order.js');

router.route('/:idOrder').get(orderController.get);

router.route('/:idOrder').put(orderController.put);


module.exports = router;