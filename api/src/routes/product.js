const express = require('express');
const router = require('express').Router();
const {Op} = require('sequelize');
const axios = require('axios');
const productController = require('./controllers/product');
// const {products, categorias} = require('../models/models');

//router.use(express.json());

router
    .route('/:idProduct')
    .get(productController.get);

router
    .route('/')
    .post(productController.post);

module.exports = router;