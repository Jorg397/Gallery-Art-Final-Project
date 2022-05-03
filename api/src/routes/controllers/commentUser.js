require("dotenv").config();
const axios = require("axios");
const { Comment, Image} = require("../../db");

module.exports = {





putUser: async (req, res) => {
    let aux = req.params.idComment;

    const { description, urlImage} = req.body;

    try {
     
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
}