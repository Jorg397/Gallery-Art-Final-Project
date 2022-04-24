const router = require("express").Router();
const paymentControllers = require("./controllers/payment.js");
const passport = require('passport');

//prettier-ignore
router.post("/",
    passport.authenticate('jwt', { session: false }),
    paymentControllers.post);
    // .route('/')
    // .post(paymentControllers.post);
module.exports = router;
