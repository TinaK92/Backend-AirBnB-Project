'use strict';

const { Review } = require('../models');
const review = require('../models/review');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

const reviews = [
  {
    "userId": 1,
    "spotId": 2,
    "review": "The house was beautiful! It was very clean and tidy upon arrival. ",
    "stars": 5,
    
  },
  {
    "userId": 1,
    "spotId": 3,
    "review": "The house was huge and right on the beach. The owner provided all the beach chairs, umbrellas, and toys for the kids, which was a great added little touch! Will be rebooking!",
    "stars": 5,

  }, 
  {
    "userId": 1,
    "spotId": 5,
    "review": "This was in walking distance to central park. Beautiful neighborhood and plenrt of public transportation that was very close ro house.",
    "stars": 4,
    
  },
  {
    "userId": 2 ,
    "spotId": 5,
    "review": "Cozy and convenient, but a bit noisy",
    "stars": 4,

  },
{
    "userId": 2 ,
    "spotId": 1,
    "review": "Quiet and relaxing place to write code",
    "stars": 4,

  },
{
    "userId": 2 ,
    "spotId": 4,
    "review": "Amazing view and scenery of the mountains!",
    "stars": 4,

  },
  {
    "userId": 3 ,
    "spotId": 1,
    "review": "Small and nice place to sit down and study",
    "stars": 5,

  },
{
    "userId": 3,
    "spotId": 2,
    "review": "Nice and clean area",
    "stars": 5,

  },
{
    "userId": 3,
    "spotId": 4,
    "review": "The place was clean and tidy when walking in",
    "stars": 4,

  }
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   for (let i = 0; i < reviews.length; i++) {
    await Review.create(reviews[i]);
   }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let i = 0; i < reviews.length; i++) {
      Review.destroy({
        where: 
          reviews[i]
      });
    }
  }
};
