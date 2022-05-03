const router = require("express").Router();
const products = require("./controllers/products");

router.route("/").get(products.get);

module.exports = router;
