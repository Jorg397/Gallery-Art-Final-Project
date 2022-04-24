const router = require("express").Router();
const categories = require("./controllers/categories");
const passport = require('passport');

//prettier-ignore
router
    .route("/")
    .get(categories.get)

router.post("/",
    passport.authenticate('jwt', { session: false }),
    categories.post);

module.exports = router;
