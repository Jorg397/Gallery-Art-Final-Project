const router = require("express").Router();
const paymentControllers = require("./controllers/payment.js");
const middleware = require("../middleware/protectRoutes");

router.use(middleware.protectRoutes);

router.route("/").post(paymentControllers.post);
module.exports = router;
