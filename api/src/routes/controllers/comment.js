require("dotenv").config();
const axios = require("axios");
const { Comment, Image, Customer } = require("../../db");

module.exports = {
  post: async (req, res) => {
    try {
      const { description, validated, customerIdCustomer, urlImage } = req.body;

      // await Comment.findAll({
      //   where: {
      //     customerIdCustomer: customerIdCustomer,
      //   },
      //   attributes: ["id_comment","description","validated","customerIdCustomer"],
      // });

      let coment = await Comment.create({
        description: description,
        validated: validated,
        customerIdCustomer: customerIdCustomer,
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
    } catch (error) {
      res.status(400).send(error);
    }
  },


  put: async (req, res) => {
    let aux = req.params.idComment;

    const { description, urlImage,validated} = req.body;

    try {
      await Comment.update({ 
        validated
      },
       
        {
          where: {
            id_comment: aux,
          },
        }
      );
      await Comment.update({ 
        description
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
    const aux = req.params.idComment;
console.log(aux)
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
