const router = require("express").Router();
const productController = require("./controllers/product");
const middleware = require("../middleware/protectRoutes");

router.route("/:idProduct").get(productController.get);

router.use(middleware.protectRoutes);

router.route("/").post(productController.post);

module.exports = router;
