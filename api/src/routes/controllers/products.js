require("dotenv").config;
const { Product,Category } = require("../../db");
const { Op } = require("sequelize");


module.exports = {
  async get(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
    try {
      const getProducts = async (query) => {
        return await Product.findAndCountAll(query);
      };

      let query;
      if (req.query.name) {
         const { name } = req.query;
        query = {
          where: {
            name: {
              [Op.like]: `%${name.toLowerCase()}%`,
            },
          },
          attributes: [
            "id_product",
            "serie",
            "name",
            "description",
            "technique",
            "measures",
            "image",
            "price",
            "sku",
            "released",
            "state",
          ],
          limit: 20,
          offset: page * 20,
          include:[
{
    model:Category,
   attributes:[
     "id_category",
      "name",

   ],
    through: {
      attributes: [],
    },
}

          ]
          
        };
      } else {
        query = {
          attributes: [
            "id_product",
            "serie",
            "name",
            "description",
            "technique",
            "measures",
            "image",
            "price",
            "sku",
            "released",
            "state",
          ],
          limit: 20,
          offset: page * 20,
          include:[
            {
              model:Category,
              attributes:[
                "id_category",
           "name",

              ],
            through: {
            attributes: [],
          } 
         },
           
          ]
        
          
        };
      }
      const products = await getProducts(query);
      res.send({
        totalPages: Math.ceil(products.count / 5),
        content: products.rows,
      });
    } catch (err) {
      res.send(err);
    }
  },
};
