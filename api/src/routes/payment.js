const router = require("express").Router();
const paymentControllers = require("./controllers/payment.js");
const passport = require('passport');
const { checkRoles } = require("./utils/models/models.js");

//prettier-ignore
router.post("/",
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'user'),
    paymentControllers.post);

module.exports = router;
