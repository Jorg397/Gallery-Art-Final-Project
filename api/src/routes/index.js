const { Router } = require("express");
const products = require("./products");
const categories = require("./categories");
const page404 = require("./404");
const router = Router();

router.use("/products", products);
router.use("/categories", categories);

router.use("*", page404);

module.exports = router;
