const router = require("express").Router();
const categories = require("./controllers/categories");

//prettier-ignore
router
    .route("/")
    .get(categories.get)

module.exports = router;
