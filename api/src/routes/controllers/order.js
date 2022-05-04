require("dotenv").config();
const { Product, Order, Customer } = require("../../db");
const { todayDate } = require("../utils/models/models");

module.exports = {
  //TODO: Como usar el get? /product/:idProduct y te trae toda la info que mandaba en el Jason Server :D
  get: async (req, res) => {
    const { idOrder } = req.params;
    //lop que es producto va a ser orden y lo que es categoria va a ser producto
    if (idOrder && idOrder.includes("-")) {
      try {
        const order = await Order.findOne({
          where: {
            id_order: idOrder,
          },
          include: Product,
        });
        let data = {
          idOrder: order.dataValues.id_order,
          amount: order.dataValues.amount,
          order_date: order.dataValues.order_date,
          status: order.dataValues.order_status,
          observation: order.dataValues.observation,
          shipping_address: order.dataValues.shipping_address,
          customerId: order.dataValues.customerIdCustomer,
          products: order.products.map((c) => {
            let prod = {
              idProduct: c.dataValues.id_product,
              name: c.dataValues.name,
              price: c.dataValues.price,
              description: c.dataValues.description,

              technique: c.dataValues.technique,
              released: c.dataValues.released,
              image: c.dataValues.image,
              state: c.dataValues.state,
            };
            return prod;
          }),
        };
        res.status(200).json(data);
      } catch (error) {
        res.status(404).send("Product not found");
      }
    } else {
      res.status(400).send("Bad request");
    }
  },
  post: async (req, res) => {
    const { idCustomer, amount, observation, shipping_address } = req.body;
    if (idCustomer && amount && observation && shipping_address) {
      try {
        const user = await Customer.findOne({
          where: {
            id_customer: idCustomer,
          },
        });
        if (!user) {
          res.status(404).send("Customer not found");
        } else {
          const order = await Order.create({
            amount,
            observation,
            shipping_address,
            order_date: todayDate(),
          });
          await user.addOrder(order);
          const finalOrder = await Order.findByPk(order.id_order);
          res.status(201).json(finalOrder);
        }
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(400).send("Bad request");
    }
  },

  put: async (req, res) => {
    const { idOrder } = req.params;
    const { amount, observation, shipping_address } = req.body;

    if (amount && observation && shipping_address) {
      try {
        const order = await Order.findByPk(idOrder);
        if (!order) {
          res.status(404).send("Order not found");
        } else {
          await order.update({
            amount,
            observation,
            shipping_address,
          });
          res.status(200).json("order updated");
        }
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    }
  },
  putStatus: async (req, res) => {
    const { idOrder } = req.params;
    const { status, codeSend, companySend } = req.body;

    if (
      status &&
      (status === "Created" || status === "Pending" || status === "Delivered")
    ) {
      const updateField = { order_status: status };
      if (codeSend) updateField.codeSend = codeSend;
      if (companySend) updateField.companySend = companySend;
      try {
        const order = await Order.findByPk(idOrder);
        if (!order) {
          res.status(404).send("Order not found");
        } else {
          await order.update(updateField);
          res.status(200).json("order status updated");
        }
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    } else {
      res.status(400).send("Bad request");
    }
  },
  delete: async (req, res) => {
    const { idOrder } = req.params;
    try {
      const order = await Order.findByPk(idOrder);
      if (!order) {
        res.status(404).send("Order not found");
      } else {
        await order.destroy();
        res.status(200).json("order deleted");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
