const express = require('express');
const router = require('express').Router();
const customerController = require('./controllers/customer');

router
    .route('/')
    .post(customerController.post);

router
    .route('/')
    .get(customerController.get);

module.exports = router;