require("dotenv").config();
const axios = require("axios");
const { Product, Order } = require("../../db");

module.exports = {
  get: async (req, res) => {
    try {
      const getDbOrder = await Order.findAll({
        attributes: [
          "id_order",
          "amount",
          "order_date",
          "order_status",
          "observation",
          "shipping_address",
          "customerIdCustomer",
          "codeSend",
          "companySend",
        ],

        include: [
          {
            model: Product,
            attributes: [
              "id_product",
              "serie",
              "name",
              "description",
              "technique",
              "measures",
              "image",
              "price",
              "sku",
              "released",
              "state",
            ],

            through: {
              attributes: [],
            },
          },
        ],
      });
      res.send(getDbOrder);
    } catch (error) {
      console.log("Fail database connection");
    }
  },
  getCustomer: async (req, res) => {
    try {
      const {idCustomer} = req.params;
      const getDbOrder = await Order.findAll({
        attributes: [
          "id_order",
          "amount",
          "order_date",
          "order_status",
          "observation",
          "shipping_address",
          "customerIdCustomer",
          "codeSend",
          "companySend",
        ],

        include: [
          {
            model: Product,
            attributes: [
              "id_product",
              "name",
              "image",
              "price",
              "state",
            ],

            through: {
              attributes: [],
            },
          },
        ],
        where: {
          customerIdCustomer: idCustomer
        }
      });
      res.status(200).send(getDbOrder);
    } catch (error) {
      console.log("Fail database connection");
      res.send('Fail consult');
    }
  },
};
