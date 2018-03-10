'use strict';
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    name: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
      get() {
        return this.getDataValue('name');
      },
    },
  }, {
    getAll() {
      return this;
 } });
  Site.associate = function(models) {
    // associations can be defined here
  };
  return Site;
};
