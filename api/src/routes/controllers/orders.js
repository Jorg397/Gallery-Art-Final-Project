require('dotenv').config();
const axios = require('axios')
const { Product, Order } = require('../../db');

module.exports= {


   async  get(req, res) {
        try{
              const getDbOrder= await Order.findAll(
            {attributes:["id_order",
            "amount",
            "order_date",
            "order_status",
            "observation",
            "shipping_address",
            "customerIdCustomer"
          ],
                  
        
        include:[
          {
              model:Product,
             attributes:[
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
          
             
              through: {
                attributes: [],
              },
          }
          
                    ]
                  }

          )
            res.send(getDbOrder);
         }
          catch(error){console.log('Fail database connection')}
          },

}