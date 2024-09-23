'use strict';
const { Model, Valdidator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Spot has many Bookings
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
      });
      // Spot has many Reviews
      Spot.hasMany(models.Reviews, {
        foreignKey: 'spotId', 
        onDelete: 'CASCADE',
      });
      // Spot has many Spot Images
      Spot.hasMany(models.SpotImages, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
      });
      // Spot belongs to User by id
      Spot.belongsTo(models.User, {
        foreignKey: 'id', 
        onDelete: 'CASCADE',
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};