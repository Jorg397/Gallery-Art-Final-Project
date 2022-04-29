require("dotenv").config;
const { Comment, Order } = require("../../db");
//const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    try {
      let getComment = await Comment.findAll({
        attributes: ["description", "orderIdOrder"],

        include: [
          {
            model: Order,

            attributes: ["id_order",
            "amount",
            "order_date",
            "order_status",
            "observation",
            "shipping_address",
            "customerIdCustomer"],
          },
        ],
        //         }
      });
      res.send(getComment);
    } catch (error) {
      console.log("Fail database connection");
    }
  },
};


