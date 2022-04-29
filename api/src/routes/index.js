const { Router } = require("express");
const products = require("./products");
const product = require("./product");
const categories = require("./categories");
const customer = require("./customer");
const payment = require("./payment");
const page404 = require("./404");
const router = Router();
const nodeMailer=require("./mailer");
const orderById=require("./order")
const ordersGet=require("./orders");
const commentGet=require("./comments");
const commentPost=require("./comment");
const commentPut=require("./comment");
const commentDelete=require("./comment");
//const commentPostImage=require("./comment");

router.use("/products", products);
router.use("/categories", categories);
router.use("/product", product);
router.use("/customer", customer);
router.use("/payment",payment);
router.use("/mailer", nodeMailer);
router.use("/orders", ordersGet);
router.use("/order", orderById);
router.use("/comments", commentGet);
router.use("/comment", commentPost);
router.use("/comment", commentPut);
router.use("/comment", commentDelete);



//------------------------todas las rutas antes del *!!!!!!!!!!
router.use("*", page404);







module.exports = router;





module.exports = router;
