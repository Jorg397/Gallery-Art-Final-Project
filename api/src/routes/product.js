const express = require('express');
const router = require('express').Router();
const productController = require('./controllers/product');

router
    .route('/:idProduct')
    .get(productController.get)
    .put(productController.put);
    
router
    .route('/')
    .post(productController.post)

   
module.exports = router;