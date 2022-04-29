require("dotenv").config();
const axios = require("axios");
const { Comment, Image } = require("../../db");

module.exports = {
  post: async (req, res) => {
    try {
      const { description, validated, orderIdOrder, urlImage } = req.body;

      const comentario = await Comment.findOne({
        where: {
          orderIdOrder: orderIdOrder,
        },
      });

      if (comentario) {
        res.status(400).send("El comentario ya existe");
      } else {
        let coment = await Comment.create({
          description: description,
          validated: validated,
          orderIdOrder: orderIdOrder,
        });

        for (let i = 0; i < urlImage.length; i++) {
          let aux = "";
          aux = urlImage[i];
          await Image.create({
            urlImage: aux,
            commentIdComment: coment.dataValues.id_comment,
          });
        }

        res.status(201).json("Comentario guardado");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  put: async (req, res) => {
    let aux = req.params.idComment;

    const { description, urlImage } = req.body;

    try {
      await Comment.update(
        {
          description,
        },
        {
          where: {
            id_comment: aux,
          },
        }
      );

      await Image.destroy({
        where: {
          commentIdComment: aux,
        },
      });

      const url = urlImage.map(async (element) => {
        await Image.create({
          urlImage: element,
          commentIdComment: aux,
        });
      });
      Promise.all(url);

      res.status(201).send("comment and image updated !");
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    let aux = req.params.idComment;

    try {
      Comment.findOne({
        where: {
          id_comment: aux,
        },
      }).then((comment) => {
        comment.destroy();
      });

      await Image.destroy({
        where: {
          commentIdComment: aux,
        },
      });

      res.status(201).send("comment and image deleted !");
    } catch (error) {
      res.status(400).send("Error deleting  row!");
    }
  },
};
