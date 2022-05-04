require("dotenv").config;
const { Comment, Order, Customer, Image } = require("../../db");
//const { Op } = require("sequelize");

module.exports = {
  async get(req, res) {
    console.log("hola");
    try {
      let getComment = await Comment.findAll({
        attributes: [
          "id_comment",
          "description",
          "customerIdCustomer",
          "validated",
        ],

        include: [
          {
            model: Image,
            attributes: ["id_image", "urlImage", "commentIdComment"],
          },
          {
            model: Customer,
            attributes: ["id_customer", "name", "lastName", "email"],
          }
        ],
      });
      res.send(getComment);
    } catch (error) {
      console.log("Fail database connection");
    }
  },
};

/*"id_order",
            "amount",
            "order_date",
            "order_status",
            "observation",
            "shipping_address",
            "customerIdCustomer"*/
