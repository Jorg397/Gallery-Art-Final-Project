const express = require("express");
const router = require("express").Router();
const productController = require("./controllers/product");
const passport = require("passport");
const { checkRoles } = require("./utils/models/models");

router.route("/:idProduct").get(productController.get);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "employed"),
  productController.post
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "employed"),
  productController.post
);

router.put(
  "/:idProduct",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "employed"),
  productController.put
);

module.exports = router;
