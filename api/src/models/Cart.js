const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('cart', {
    id_cart: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, allowNull: false },
    
  });
};
