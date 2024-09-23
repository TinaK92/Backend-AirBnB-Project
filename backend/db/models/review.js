'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Review belongs to Spot by id
      Review.belongsTo(models.Spots, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
      // Review belongs to User by id
      Review.belongsTo(models.Users, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
      // Review has many review images by reviewId
      Review.hasMany(models.ReviewImages, {
        foreignKey: 'reviewId', 
        onDelete: 'CASCADE',
      })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};