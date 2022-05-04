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
          email: email,
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

    const { email, name } = req.body;
    try{
      if(email){
        const [user, created] = await Customer.findOrCreate({
          where: {
            email,
          },
          defaults: {
            name: name.split(" ")[0],
            email,
          },
        });
        const payload = {
          sub: user.id_customer,
          role: user.role,
        };
        const token = jwt.sign(payload, keyTokens, {
          expiresIn: "1h",
        });
        const prueba = {user, token};
        console.log(prueba);
        res.json({
          user,
          token,
        });
      }else{
        res.status(400).send("email incorrect");
      }

    }catch(error){
      res.status(400).send("hubo un error en el server");
    }
  },
  get: async (req, res) => {
    try {
      const costumer = await Customer.findAll();
      delete costumer.password;
      delete costumer.recoveryToken;
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
        delete costumer.dataValues.recoveryToken;
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
      status,
      role,
    } = req.body;

    // if(email){
    try {
      let customer = await Customer.update(
        {
          dni,
          name,
          lastName,
          email,
          phone,
          country,
          default_shipping_address,
          billing_address,
          status,
          role,
        },
        {
          where: {
            id_customer: id,
          },
        }
      );
      res.status(200).json({ message: "user updated", name: customer.name });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "error updating customer" });
    }
  },

  passport: async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id_customer,
        role: user.role,
      };
      const token = jwt.sign(payload, keyTokens, {
        expiresIn: "1d",
      });
      const prueba = {user, token};
      console.log(prueba);
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
