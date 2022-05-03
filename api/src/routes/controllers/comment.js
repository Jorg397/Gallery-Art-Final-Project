require("dotenv").config();
const axios = require("axios");
const { Comment, Image} = require("../../db");

module.exports = {
  post: async (req, res) => {
    try {
      const { description, validated, customerIdCustomer, urlImage } = req.body;

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


  


  putAdmin: async (req, res) => {
    let aux = req.params.idComment;

    const {validated} = req.body;

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
    
      res.status(201).send("Validated modificada con exito!");
    } catch (error) {console.log(error)
      res.status(400).send(error);
    }
  },
};
