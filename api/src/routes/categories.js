const router = require("express").Router();
const categories = require("./controllers/categories");
const passport = require("passport");
const { checkRoles } = require("./utils/models/models");

//prettier-ignore
router
    .route("/")
    .get(categories.get)

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "employed"),
  categories.post
);

router.delete(
  "/:idCategories",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "employed"),
  categories.delete
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "employed"),
  categories.put
);
module.exports = router;
