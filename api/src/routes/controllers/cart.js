require("dotenv").config();
const axios = require("axios");
const { Product, Cart, Customer, Category } = require("../../db");

module.exports = {
  get: async (req, res) => {
    const id_cart = req.params.idcart;
    console.log("idcart por params", id_cart);
    try {
      if (id_cart) {
        const carrito = await Cart.findOne({
          where: {
            id_cart: id_cart,
          },

          include: [
            {
              model: Product,
              attributes: [
                "id_product",
                "name",
                "description",
                "serie",
                "technique",
                "measures",
                "image",
                "price",
                "sku",
                "released",
                "state",
              ],
              througth: {
                //mediante los atributos, traeme el name. sino traeria solo name porque es el unico, pero
                //si hubiera mas atributos podria traer mas
                attributes: [],
              },
              include: [
                { model: Category, attributes: ["id_category", "name"] },
              ],
            },

            { model: Customer, attributes: ["id_customer", "name"] },
          ],
        });

        carrito.dataValues.products.forEach((element) => {
          element.dataValues.categories.map((a) => {
            console.log(a.dataValues.name);
          });
        });

        //console.log({carrito} )
        let data = {
          id_cart: id_cart,
          customer: await Customer.findByPk(
            carrito.dataValues.customerIdCustomer,
            {
              attributes: ["id_customer", "name"],
            }
          ),

          product: carrito.dataValues.products.map((c) => {
            let carro = {
              id_product: c.dataValues.id_product,
              serie: c.dataValues.serie,
              name: c.dataValues.name,
              description: c.dataValues.description,
              technique: c.dataValues.technique,
              measures: c.dataValues.measures,
              image: c.dataValues.image,
              price: c.dataValues.price,
              sku: c.dataValues.sku,
              released: c.dataValues.released,
              state: c.dataValues.state,
              categories: c.dataValues.categories.map((a) => {
                return {
                  id_category: a.dataValues.id_category,
                  name: a.dataValues.name,
                };
              }),
            };
            return carro;
          }),
        };
        res.status(200).json(data);
      } else {
        res.status(400).send("Bad request");
      }
    } catch (error) {
      console.log(error);
      res.status(404).send("Product not found");
    }
  },

  post: async (req, res) => {
    const { idcustomer } = req.params;
    console.log(idcustomer);
    try {
      const carritoDb = await Cart.findOne({
        where: { customerIdCustomer: idcustomer },
      });

      if (!carritoDb) {
        let carritoCreado = await Cart.create({
          customerIdCustomer: idcustomer,
        });
        if (carritoCreado._options.isNewRecord === true)
          res.send("Cart Created!");
        else res.send("Error Creating row in database ");
      } else res.send("this customer already has the cart created");
    } catch (error) {
      console.log(error);
    }
  },

  put: async (req, res) => {
    // const { idcart } = req.params;
    // let { products } = req.body;

    // try {
    //   const carritoDb = await Cart.findOne({
    //     where: {
    //       id_cart: idcart,
    //     },
    //     include:[{
    //       model:Product,
    //       attributes:["id_product"],
    //       througth: {
    //         attributes: [],
    //       },
    //     }]
    //   });
    //   console.log(carritoDb.dataValues.products.length)
      
    //   // let busqueda = await Product.findAll({
    //   //   where: {
    //   //     cartIdCart: idcart,
    //   //   },
    //   // });
    //  // let productoEnDb = await Product.findByPk(products[products.length - 1]);







    //   if (carritoDb.dataValues.products.length > 0) {
    //       if(products.length===0) await carritoDb.removeProduct({
    //         where:{
    //           productIdProduct:"1d6cfbe2-6086-4568-a380-a270868bc584",
        
    //         }},)

    //     // for (let i = 0; i < busqueda.length; i++) {
    //     //   if (
    //     //     products.indexOf(
    //     //       busqueda[busqueda.length - 1].dataValues.id_product
    //     //     ) === -1
    //     //   ) {
    //     //     await Product.update(
    //     //       {
    //     //         cartIdCart: null,
    //     //       },
    //     //       {
    //     //         where: {
    //     //           id_product: busqueda[i].dataValues.id_product,
    //     //         },
    //     //       }
    //     //     );
    //     //     res.send("Producto quitado del carrito");
    //     //   }
    //     // }
    //     res.send("Producto quitado del carrito");
    //     // if (productoEnDb.dataValues.cartIdCart === null) {
    //     //   await Product.update(
    //     //     {
    //     //       cartIdCart: idcart,
    //     //     },
    //     //     {
    //     //       where: {
    //     //         id_product: products[products.length - 1],
    //     //       },
    //     //     }
    //     //   );
    //     //   res.send("Producto agregado al carrito");
    //     // } else {
    //     //   // if (productoEnDb.dataValues.cartIdCart !== idcart)
    //     //   //   res.send("producto seleccionado por otro cliente");
    //     //    res.send("El producto ya existe en el carrito");
    //     //}
    //   } else if (products.length>0){

    //             carritoDb.addProduct(products)
    //             res.send('producto agregado al carrito')
    //                        }
    //           else res.send("carrito Vacio"); 
      
    // } catch (error) {
    //   console.log(error);
    // }
  },
};




/*  //si hay registro de ese carrito en db lo borro

        console.log("aca entra");

        // let busquedaVacia = await Product.findAll({
        //   where: {
        //     cartIdCart: idcart,
        //   },
        // });
        // console.log(busquedaVacia);
        // if (busquedaVacia.length === 0) res.send("Carrito vacio!");
        // for (let i = 0; i < busquedaVacia.length; i++) {
        //   await Product.update(
        //     {
        //       cartIdCart: null,
        //     },
        //     {
        //       where: {
        //         id_product: busquedaVacia[i].dataValues.id_product,
        //       },
        //     }
        //   );*/