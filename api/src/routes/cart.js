const express = require("express");
const router = require("express").Router();
const cartController = require("./controllers/cart");
const passport = require("passport");
const { checkRoles } = require("./utils/models/models");

// router.route("/:idcart").get(cartController.get);

router
  .post(
    "/:idClient/product/:idProduct",
    passport.authenticate("jwt", { session: false }),
    checkRoles("admin", "employed"),
    cartController.postCP
  )
  .get("/:idcart", cartController.get)
  .get("/product/:idClient", cartController.getCP)
  .delete("/:idcart", cartController.delete)
  .delete("/:idcart/product/:idProduct", cartController.deleteCP);

// router.route("/:idcustomer").post(cartController.post);

module.exports = router;
