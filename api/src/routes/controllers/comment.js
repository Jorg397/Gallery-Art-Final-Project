require("dotenv").config();
const axios = require("axios");
const { Comment, Image } = require("../../db");

module.exports = {
  post: async (req, res) => {
    try {
      const { description, validated, customerIdCustomer, images } = req.body;

      console.log("req.body", req.body);
      let coment = await Comment.create({
        description: description,
        validated: true,
        customerIdCustomer: customerIdCustomer,
      });

      for (let i = 0; i < images.length; i++) {
        let aux = "";
        aux = images[i].trim();
        await Image.create({
          urlImage: aux,
          commentIdComment: coment.dataValues.id_comment,
        });
      }
      res.status(201).json("Comentario guardado");
    } catch (error) {
      res.status(400).send(error);
    }
  },

  putAdmin: async (req, res) => {
    let aux = req.params.idComment;

    const { validated } = req.body;

    try {
      await Comment.update(
        {
          validated,
        },

        {
          where: {
            id_comment: aux,
          },
        }
      );

      res.status(201).send("Validated modificada con exito!");
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
