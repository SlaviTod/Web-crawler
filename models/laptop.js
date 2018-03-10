'use strict';
module.exports = (sequelize, DataTypes) => {
  const Laptop = sequelize.define('Laptop', {
    model: {
      type: DataTypes.STRING(50),
      allowNull: false,
      get() {
          return this.getDataValue('model');
      },
    },
    display: {
        type: DataTypes.FLOAT,
        get() {
            return this.getDataValue('display');
        },
    },
    price: {
        type: DataTypes.FLOAT,
        get() {
            return this.getDataValue('price');
        },
    },
  }, {});
  Laptop.associate = function(models) {
    const {
      Producer,
      Site,
    } = models;

    Laptop.belongsTo(Producer, {
        foreignKey: {
            allowNull: false,
        },
        onDelete: 'CASCADE',
    });
    Laptop.belongsTo(Site, {
        foreignKey: {
            allowNull: false,
        },
        onDelete: 'CASCADE',
    });
  };
  return Laptop;
};
