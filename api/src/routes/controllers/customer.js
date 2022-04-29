require("dotenv").config();
const { Customer } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { keyTokens } = process.env;

module.exports = {
  post: async (req, res) => {
    try {
      const { email, password } = req.body;
      const costumer = await Customer.findOne({
        where: {
          email,
        },
      });

      if (costumer) {
        res.status(400).send("Email already exists");
      } else if (email && password) {
        const passwordhash = await bcrypt.hash(password, 10);
        let costumer = await Customer.create({
          email,
          password: passwordhash,
        });
        res.status(201).json({
          message: "cuenta creada",
        });
      } else {
        res.status(400).send("parameters missing");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  googleloginPost: async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
      if (email) {
        let customer = await Customer.findOne({
          where: {
            email,
          },
        });
        if (customer) {
          customer = customer.toJSON();
          const payload = {
            check: true,
            id_customer: customer.id_customer,
          };
          console.log("este es el customer ",customer);
          const token = jwt.sign(payload, keyTokens, {
            expiresIn: "1h",
          });
          return res.status(200).json({
            message: "usuario y contraseña correctos",
            token: token,
            id_customer: customer.id_customer,
            name : customer.name,
          });
        }else {
          let customer = await Customer.create({
            email,
          });
          console.log("este es el customer create ",customer);
          customer = customer.toJSON();
          const payload = {
            check: true,
            id_customer: customer.id_customer,
          };
          const token = jwt.sign(payload, keyTokens, {
            expiresIn: "1h",
          });
          return res.status(200).json({
            message: "usuario y contraseña correctos",
            token: token,
            id_customer: customer.id_customer,
            name : customer.name,
          });
        }
      } else {
        res.status(400).send("email incorrect");
      }
    } catch (error) {
      res.status(400).send("hubo un error en el server");
    }
  },
  get: async (req, res) => {
    try {
      const costumer = await Customer.findAll();
      delete costumer.password;
      res.status(200).json(costumer);
    } catch (error) {
      console.log(error);
      res.status(400).send("hubo un error en el server");
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const costumer = await Customer.findOne({
        where: {
          id_customer: id,
        },
      });
      if (costumer) {
        delete costumer.dataValues.password;
        res.status(200).json(costumer);
      } else {
        res.status(400).send("user not found");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("bad request");
    }
  },

  put: async (req, res) => {
    const { id } = req.params;
    const {
      dni,
      name,
      lastName,
      email,
      phone,
      country,
      default_shipping_address,
      billing_address,
    } = req.body;

    // if(email){
    try {
      await Customer.update(
        {
          dni,
          name,
          lastName,
          email,
          phone,
          country,
          default_shipping_address,
          billing_address,
        },
        {
          where: {
            id_customer: id,
          },
        }
      );
      res.status(200).json({ message: "user updated" });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "error updating customer" });
    }
    //}else{
    // res.status(400).send('email is required')
    //}
  },

  passport: async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id_customer,
        role: user.role,
      };
      const token = jwt.sign(payload, keyTokens, {
        expiresIn: "1h",
      });
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
