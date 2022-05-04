const { Router } = require("express");
const products = require("./products");
const product = require("./product");
const categories = require("./categories");
const customer = require("./customer");
const payment = require("./payment");
const page404 = require("./404");
const router = Router();
const nodeMailer = require("./mailer");
const orderById = require("./order");
const ordersGet = require("./orders");
const cart = require("./cart");
const comment = require("./comment");
const commentUser = require("./commentUser");
const comments = require("./comments");
const carrito = require("./cart");

router.use("/products", products);
router.use("/categories", categories);
router.use("/product", product);
router.use("/customer", customer);
router.use("/payment", payment);
router.use("/mailer", nodeMailer);
router.use("/orders", ordersGet);
router.use("/order", orderById);
router.use("/cart", cart);
router.use("/comments", comments);
router.use("/comment", comment);
router.use("/commentUser", commentUser);
router.use("/cart", carrito);

//------------------------todas las rutas antes del *!!!!!!!!!!
router.use("*", page404);

module.exports = router;
