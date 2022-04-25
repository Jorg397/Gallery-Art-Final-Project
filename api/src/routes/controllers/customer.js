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
        const costumer = await Customer.create({
          email,
          password: passwordhash,
        });
        const payload = {
          check: true,
        };
        const token = jwt.sign(payload, keyTokens, {
          expiresIn: "1h",
        });
        res
          .status(201)
          .json({ token: token, message: "usuario y contraseña correctos" });
      } else {
        res.status(400).send("parameters missing");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  loginPost: async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      if (email && password) {
        const costumer = await Customer.findOne({
          where: {
            email,
          },
        });
        if (costumer) {
          const passwordMatch = await bcrypt.compare(
            password,
            costumer.password
          );
          if (passwordMatch) {
            const payload = {
              check: true,
            };
            const token = jwt.sign(payload, keyTokens, {
              expiresIn: "1h",
            });
            res
              .status(200)
              .json({
                token: token,
                message: "usuario y contraseña correctos",
              });
          } else {
            res.status(400).send("password incorrect");
          }
        } else {
          res.status(400).send("email incorrect");
        }
      } else {
        res.status(400).send("parameters missing");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("hubo un error ene le server");
    }
  
},

  googleloginPost: async (req, res) => {
    

    const { email } = req.body;
    console.log(email);
    try {
      if (email) {
    await Customer.findOne({
          where: {
            email,
          },
        });

        res.status(200).json({ message: "usuario y contraseña correctos" });
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
      if(costumer){
        delete costumer.dataValues.password;
        res.status(200).json(costumer);
      }else{
        res.status(400).send("user not found");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("bad request");
    }
  },

  
  put: async (req, res) => {
    const {id} = req.params;
    const { name, lastName, email, phone, country, default_shipping_address, billing_address } = req.body;

    if(email){
      try{
        await Customer.update({
          name,
          lastName,
          email,
          phone,
          country,
          default_shipping_address,
          billing_address
        },{
          where: {
            id_customer: id
          }
        })
        res.status(200).json('customer updated')
      }catch(err){
        console.log(err);
        res.status(400).send('error updating customer')
      }
    }else{
      res.status(400).send('email is required')
    }
  }
 }

