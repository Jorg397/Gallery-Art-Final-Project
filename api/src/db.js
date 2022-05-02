require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { throws } = require('assert');
//const Cart = require('./models/Cart');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/gallery`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product,Seller,Order,Customer,Category,Cart,Comment,Image} = sequelize.models;


// Aca vendrian las relaciones
//Product.hasMany(Reviews);
Seller.hasMany(Product);
Product.belongsTo(Seller);

Customer.hasMany(Order);
Order.belongsTo(Customer);

Order.belongsToMany(Product,{through:"order_product"})
Product.belongsToMany(Order,{through:"order_product"})
Product.belongsToMany(Category,{through:"product_category"})
Category.belongsToMany(Product,{through:"product_category"})

Comment.hasMany(Image)
Image.belongsTo(Comment)

Order.hasOne(Comment);
Comment.belongsTo(Order);

Cart.belongsToMany(Product,{through:"cart_product"});
Product.belongsToMany(Cart,{through:"cart_product"})

Customer.hasOne(Cart);
Cart.belongsTo(Customer);




module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
