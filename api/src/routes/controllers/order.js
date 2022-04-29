require('dotenv').config();
const axios = require('axios')
const { Product, Order } = require('../../db');

module.exports= {
    //TODO: Como usar el get? /product/:idProduct y te trae toda la info que mandaba en el Jason Server :D
    get: async (req, res) => {
        const { idOrder } = req.params;
//lop que es producto va a ser orden y lo que es categoria va a ser producto
        if(idOrder && idOrder.includes('-')) {
            try {
                const order = await Order.findOne({
                    where: {
                        id_order: idOrder,
                    },
                    include: Product,
                });
                let data ={
idOrder:order.dataValues.id_order,
amount:order.dataValues.amount,
order_date:order.dataValues.order_date,
status:order.dataValues.order_status,
observation:order.dataValues.observation,
shipping_address:order.dataValues.shipping_address,
customerId:order.dataValues.customerIdCustomer,
products: order.products.map(c =>{
        let prod = {
                idProduct: c.dataValues.id_product,
             name: c.dataValues.name,
             price: c.dataValues.price,
              description: c.dataValues.description,
             
                 technique: c.dataValues.technique,
                released: c.dataValues.released,
                  image: c.dataValues.image,
                  state: c.dataValues.state,
         }
             return prod;
       }),

                }
                // let data = {
                //     idProduct: product.dataValues.id_product,
                //     sku: product.dataValues.sku,
                //     name: product.dataValues.name,
                //     serie: product.dataValues.serie,
                //     measures: product.dataValues.measures,
                //     categories: product.categories.map(c =>{
                //         let ord = {
                //             idOrder: c.dataValues.id_order,
                //             name: c.dataValues.name,
                //         }
                //         return cate;
                //     }),
                //     price: product.dataValues.price,
                //     description: product.dataValues.description,
                //     technique: product.dataValues.technique,
                //     released: product.dataValues.released,
                //     image: product.dataValues.image,
                //     state: product.dataValues.state,
                // }
                res.status(200).json(data);
            } catch (error) {
                res.status(404).send('Product not found');
            }
        }else{
            res.status(400).send('Bad request');
        }
    },

   

    put: async (req, res) => {
  const id_order = req.params.idOrder

  const {order_status} = req.body

  if(order_status === "Created" ||order_status === "Pending" ||order_status ==="Delivered" ) {

      const ordenado = await Order.findByPk(id_order)
     
      ordenado.update({order_status:order_status})
      res.send("Estado cambiado con exito")
  } else{
      res.send("Error del estado")
  }
    
}
}
