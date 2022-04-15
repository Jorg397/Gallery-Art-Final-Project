
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    id_product: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, allowNull: false },
    name: { 
        type: DataTypes.STRING,
        allowNull: false },

    description: { 
      type: DataTypes.STRING,
      allowNull: false },
    technique:{  type: DataTypes.STRING,
    allowNull: false },
    measures: { type: DataTypes.STRING,
        allowNull: false },
    image:    { type: DataTypes.STRING,
    allowNull: false },

    price:{type:DataTypes.INTEGER,allowNull:false},

    serie:{type:DataTypes.STRING, allowNull:false},

    sku:{ type: DataTypes.STRING, allowNull: false},

    released:{type:DataTypes.DATEONLY,allowNull:false},

    state:{type:DataTypes.ENUM('Available','Pending','Sold'),allowNull: false,
    defaultValue:'Available'},
   
  });
};
