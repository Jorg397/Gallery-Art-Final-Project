


const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    id_order: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    amount:{type:DataTypes.DECIMAL(8,2),allowNull:false},

    order_date:{type:DataTypes.DATEONLY,allowNull:false},

    order_status:{ type: DataTypes.ENUM ,
        values:["Created","Pending","Delivered"],  allowNull:false,
      defaultValue:"Created"},
    order_date: { type: DataTypes.DATEONLY,allowNull:false },

    observation: { //por si se necesita aclarar algo en la orden de compra
      type: DataTypes.STRING,
      allowNull: true,
    },
    shipping_address: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
  });
};
