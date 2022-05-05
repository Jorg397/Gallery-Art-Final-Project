require("dotenv").config();
const { Order, Product } = require("../../db");
const express = require("express");
const Stripe = require("stripe");
const { STRIPE_BACK } = process.env;
const stripe = new Stripe(`${STRIPE_BACK}`);
//poner la clave secreta en back y clave publoca en front!!!!!

const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

module.exports = {
  post: async (req, res) => {
    // you can get more data to find in a database, and so on

    try {
      const {
        id,
        amount,
        id_customer,
        shipping_address,
        products,
        name,
        lastName,
        dni,
        phone,
        email,
        country,
      } = req.body;
      const productsId = products.map((product) => product.id_product);

      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Gaming Keyboard",
        payment_method: id,
        confirm: true, //confirm the payment at the same time
      });

      if (payment.status === "succeeded") {
        const checkProduct = await Promise.allSettled([
          Product.findAndCountAll({ where: { id_product: productsId } }).then(
            (result) => result.count
          ),
        ]).then((counts) => {
          const [{ value: countProduct }] = counts;
          return countProduct === productsId.length ? true : false;
        });

        if (checkProduct) {
          let today = new Date();
          today.toISOString().split("T")[0];

          Order.create({
            customerIdCustomer: id_customer,
            amount,
            order_date: today,
            order_status: "Created",
            observation: "",
            shipping_address: shipping_address,
          })
            .then((order) => {
              //console.log("order id: ", order.id_order);
              /* axios.post("http://localhost:3001/mailer", {
                email,
                emailType: 1,
                nombreCompleto: `${name} ${lastName}`,
                numeroDeOrden: order.id_order,
                productos: products,
                total: amount,
              }); */

              return order.addProducts(productsId);
            })
            .then((result) => {
              if (result.length === productsId.length) {
                return Product.update(
                  {
                    state: "Sold",
                  },
                  {
                    where: {
                      id_product: productsId,
                    },
                  }
                );
              }
            })
            .then((result) => {
              const response = result[0] === productsId.length ? true : false;

              return res
                .status(201)
                .json({ completed: response, message: "Successful Payment" });
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        } else {
          res.send({
            completed: false,
            message: "Alguno de los productos enviados no fue encontrado",
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.json({ message: error });
    }
  },
};
