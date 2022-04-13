const express = require('express');
const router = require('express').Router();
const {Op} = require('sequelize');
const axios = require('axios');
// const {products, categorias} = require('../models/models');

//router.use(express.json());

router.get('/', async (req, res) => {
const {name} = req.query;
res.send('product');
// if(name){
//     const response = await products.findAll({
//         where: { 
//             name:{
//                 [Op.substring]: name//.toLowerCase().replace(/\b\w/g, p => p.toUpperCase())
//             }
//         },
//         include: categorias
//     });
//     response.forEach(element => {
//         data.push({
//     });
//     }); 
//}
});

module.exports = router;