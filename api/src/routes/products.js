const router = require("express").Router();
const products = require("./controllers/products");

//prettier-ignore
router
    .route("/")
    .get(products.get);

module.exports = router;
