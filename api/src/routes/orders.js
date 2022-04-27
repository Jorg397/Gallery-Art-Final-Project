const router = require("express").Router();

const orders = require("./controllers/orders")
const passport = require('passport');
const { checkRoles } = require('./utils/models/models');


router
    .get("/", 
    passport.authenticate('jwt', { session: false }),
    checkRoles( 'admin'),
    orders.get)



module.exports= router;