const router = require("express").Router();
const passport = require("passport");

const orders = require("./controllers/orders");
const { checkRoles } = require("./utils/models/models");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "employed"),
  orders.get
);

router.get(
  "/:idCustomer",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "user", "employed"),
  orders.getCustomer
);

module.exports = router;
