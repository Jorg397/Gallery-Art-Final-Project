const router = require("express").Router();

const orders = require("./controllers/orders")

router.route('/').get(orders.get)



module.exports= router;