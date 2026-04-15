'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Airport, {
        foreignKey: 'cityId'
      })
    }
  }
  City.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, // model-level validation should live on the field definition itself
      unique: true,
      lowercase: true
    }
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};
