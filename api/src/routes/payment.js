const router = require("express").Router();
const paymentControllers = require("./controllers/payment.js");

//prettier-ignore
router
    .route('/')

    .post(paymentControllers.post);
console.log('hola1')
module.exports = router;
