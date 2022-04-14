const { Router } = require("express");
const products = require("./products");
const product = require("./product");
const categories = require("./categories");
const page404 = require("./404");
const router = Router();

router.use("/products", products);
router.use("/categories", categories);
router.use("/product", product);

router.use("*", page404);

module.exports = router;
