
require('dotenv').config();
const axios = require('axios')
const { Product, Category } = require('../../db');

module.exports= {
    //TODO: Como usar el get? /product/:idProduct y te trae toda la info que mandaba en el Jason Server :D
    get: async (req, res) => {
        const { idProduct } = req.params;

        if(idProduct && idProduct.includes('-')) {
            try {
                const product = await Product.findOne({
                    where: {
                        id_product: idProduct,
                    },
                    include: Category,
                });
                let data = {
                    idProduct: product.dataValues.id_product,
                    sku: product.dataValues.sku,
                    name: product.dataValues.name,
                    serie: product.dataValues.serie,
                    measures: product.dataValues.measures,
                    categories: product.categories.map(c =>{
                        let cate = {
                            idCategory: c.dataValues.id_category,
                            name: c.dataValues.name,
                        }
                        return cate;
                    }),
                    price: product.dataValues.price,
                    description: product.dataValues.description,
                    technique: product.dataValues.technique,
                    released: product.dataValues.released,
                    image: product.dataValues.image,
                    state: product.dataValues.state,
                }
                res.status(200).json(data);
            } catch (error) {
                res.status(404).send('Product not found');
            }
        }else{
            res.status(400).send('Bad request');
        }
    },

    post: async (req, res) => {
        const {name, description, technique, measures, image, price, sku, released, categories, serie} = req.body;
        if(name && description && technique && measures && image && price && sku && released && categories.length && serie) {
            try {

                const cateDb = categories.map(c => 
                    Category.findOne({
                        where: {
                            id_category: c.idCategory,
                        }
                    }).then(cate => !cate? Promise.reject(`Category ${c.idCategory} not found`): cate)
                )

                Promise.all(cateDb)
                    .then(async (categories) => {
                        const product = await Product.create({
                            name: name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                            description: description.trim(),
                            technique: technique.trim(),
                            measures: measures.trim(),
                            image: image.trim(),
                            price: price,
                            sku: sku.trim(),
                            serie: serie.trim(),
                            released: released.trim(),
                        })
                        await product.addCategories(categories);
                        res.status(201).send('Product created');
                    }).catch(err => {
                    res.status(400).send(err);
                    })

            } catch (error) {
                console.log(error);
                res.status(400).send('Bad request');
            }
        }else{
            res.status(400).send('Bad request missing parameters');
        }
    },

    put: async (req, res) => {
        const {idProduct}=req.params;
        const {name, description, technique, measures, image, price, sku, released, categories, serie} = req.body;

        if(name && description && technique && measures && image && price && sku && released && categories.length && serie) {
            try {

                const cateDb = categories.map(c => 
                    Category.findOne({
                        where: {
                            id_category: c,
                        }
                    }).then(cate => !cate? Promise.reject(`Category ${c.idCategory} not found`): cate)
                )

                Promise.all(cateDb)
                    .then(async (categories) => {
                         await Product.update({
                            name: name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                            description: description.trim(),
                            technique: technique.trim(),
                            measures: measures.trim(),
                            image: image.trim(),
                            price: price,
                            sku: sku.trim(),
                            serie: serie.trim(),
                            released: released.trim(),
                        },
                        {
                            where: {
                                id_product:idProduct
                            }
                        }
                                                )
                    let picture=await Product.findByPk(idProduct)
                    if(picture){await picture.setCategories(categories)
                            res.status(201).send('Product updated')      
                         }                    
                    else res.status(400).send(err);
            
                    }).catch(err => {
                        console.log(err)  })
            } catch (error) {
                console.log(error);
                res.status(400).send('Bad request');
            }
        }else{
            res.status(400).send('Bad request missing parameters');
        }
    }

} 