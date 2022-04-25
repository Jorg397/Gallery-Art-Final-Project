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
        costumer = costumer.toJSON();
        const payload = {
          check: true,
          id_customer: costumer.id_customer,
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
          costumer = costumer.toJSON();
          if (passwordMatch) {
            const payload = {
              check: true,
              id_customer: costumer.id_customer,
            };
            const token = jwt.sign(payload, keyTokens, {
              expiresIn: "1h",
            });
            res.status(200).json({
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
      res.status(400).send("server error");
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
