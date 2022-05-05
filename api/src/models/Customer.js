const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('customer', {

    id_customer: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    dni:{
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    default_shipping_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    billing_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    role:{
      type: DataTypes.ENUM('admin','user','employed'),
      allowNull: false,
      defaultValue:'user'
    },

    recoveryToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    status:{
      type:DataTypes.ENUM('Active','Inactive'),
      allowNull:false,
      defaultValue:'Active'
    },

    statusPublicity:{
      type:DataTypes.ENUM('Active','Inactive'),
      allowNull:false,
      defaultValue:'Inactive'
    }, 
  });
};

