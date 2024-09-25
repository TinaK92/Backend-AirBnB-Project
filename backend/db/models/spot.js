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
      });
      // Spot has many Reviews
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId', 
      });
      // Spot has many Spot Images
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
      });
      // Spot belongs to User by id
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner'
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notIn: {
          args: [['undefined', 'null']],
          msg: "Address cannot be set to undefined or null"
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notIn: {
          args: [['undefined', 'null']],
          msg: "City cannot be set to undefined or null"
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notIn: {
          args: [['undefined', 'null']],
          msg: "State cannot be set to undefined or null"
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: true,
        notIn: {
          args: [['undefined', 'null']],
          msg: "Country cannot be set to undefined or null"
        }
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false, 
      validate: {
        min: -80,
        max: 80
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: -180,
        max: 180
    }
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [2, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isPositive(value) {
          if (value < 0) {
            throw new Error("Price per day must be a positive number")
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};