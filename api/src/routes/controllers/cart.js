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

  postCP: async (req, res) => {
    const { idClient, idProduct } = req.params;
    const carrito = await Customer.findOne({
      where: {
        id_customer: idClient,
      },
      include: [
        {
          model: Cart,
          attributes: ["id_cart"],
          througth: {
            attributes: [],
          },
        },
      ],
    });

    const carritodb = await Cart.findByPk(
      carrito.dataValues.cart.dataValues.id_cart
    );
    carritodb.addProduct(idProduct);
    res.send("producto agregado al carrito");
  },

  delete: async (req, res) => {
    const { idcart } = req.params;
    //borra todos los productos de un idcart. vacia el carrito
    try {
      const carrito = await Cart.findOne({
        where: {
          id_cart: idcart,
        },
        include: [
          {
            model: Product,
            attributes: ["id_product"],
            througth: {
              attributes: [],
            },
          },
        ],
      });
      var array = [];
      carrito.dataValues.products.map((p) => array.push(p.id_product));
      carrito.removeProduct(array);
      res.send("Carrito vaciado");
    } catch (error) {
      res.send(error);
    }
  },

  deleteCP: async (req, res) => {
    const { idcart, idProduct } = req.params;
    //borra un solo producto del carrito idcart
    console.log(idcart);
    console.log(idProduct);

    const carritoDb = await Cart.findOne({
      where: { id_cart: idcart },
      include: [
        {
          model: Product,
          attributes: ["id_product"],
          througth: {
            attributes: [],
          },
        },
      ],
    });

    carritoDb.removeProduct(idProduct);

    res.send("Producto borrado del carrito");
  },

  //falta un get de carrito que devuelva con los idproductos

  getCP: async (req, res) => {
    //    el get puede ser el mismo que lleva todo?????????
    const { idClient } = req.params;

    const carrito = await Cart.findOne({
      where: {
        customerIdCustomer: idClient,
      },
      attributes: ["id_cart"],
      include: [
        {
          model: Product,
          attributes: ["id_product"],
          througth: {
            attributes: [],
          },
        },
      ],
    });

    let data = {
      id_cart: carrito.dataValues.id_cart,
      product: carrito.dataValues.products.map((c) => {
        let carro = {
          id_product: c.dataValues.id_product,
        };
        return carro;
      }),
    };

    res.send(data);
  },
};
