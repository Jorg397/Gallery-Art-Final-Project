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
router
    .route('/prueba/:idProduct')
   
module.exports = router;