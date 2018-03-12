'use strict';
module.exports = (sequelize, DataTypes) => {
  const Producer = sequelize.define('Producer', {
    name: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false,
      get() {
        return this.getDataValue('name');
      },
    },
  }, {

  });
  Producer.associate = function(models) {
    // associations can be defined here
  };
  return Producer;
};
