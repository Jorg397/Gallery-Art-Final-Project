const router = require("express").Router();
const passport = require("passport");

const orders = require("./controllers/orders");

router.route("/").get(orders.get);
router.route("/:idCustomer").get(orders.getCustomer);

module.exports = router;
