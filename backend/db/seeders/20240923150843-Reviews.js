'use strict';

const { Review } = require('../models');
const review = require('../models/review');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviews = [
  {
    "userId": 1,
    "spotId": 2,
    "review": "The house was beautiful! It was very clean and tidy upon arrival. ",
    "stars": 5,
    "User": {
      "id": 1,
      "firstName": "Demo",
      "lastName": "Lition"
    },
    "Spot": {
      "ownerId": 2,
      "address": "789 Silicon Valley",
      "city": "Palo Alto",
      "state": "California",
      "country": "United States of America",
      "lat": 37.441883,
      "lng": -122.143019,
      "name": "Techie's Retreat",
      "description": "Stay where innovation thrives",
      "price": 200,
      "avgRating": 4.9,
      "previewImage": "image_url_3"
    },
    "ReviewImages": [
      {
        "id": ,
        "url": "image url"
      }
    ]
  },
  {
    "userId": 1,
    "spotId": 3,
    "review": "The house was huge and right on the beach. The owner provided all the beach chairs, umbrellas, and toys for the kids, which was a great added little touch! Will be rebooking!",
    "stars": 5,
    "User": {
      "id": 1,
      "firstName": "Demo",
      "lastName": "Lition"
    },
    "Spot": {
      "ownerId": 3,
      "address": "321 Ocean Drive",
      "city": "Miami",
      "state": "Florida",
      "country": "United States of America",
      "lat": 25.761680,
      "lng": -80.191790,
      "name": "Beach Paradise",
      "description": "Oceanfront views for miles",
      "price": 300,
      "avgRating": 4.7,
      "previewImage": "image_url_4"
    },
    "ReviewImages": [
      {
        "id": ,
        "url": "image url"
      }
    ]
  }, 
  {
    "userId": 1,
    "spotId": 5,
    "review": "This was in walking distance to central park. Beautiful neighborhood and plenrt of public transportation that was very close ro house.",
    "stars": 4.2,
    "User": {
      "id": 1,
      "firstName": "Demo",
      "lastName": "Lition"
    },
    "Spot": {
      "ownerId": 3,
    "address": "909 Central Park West",
    "city": "New York",
    "state": "New York",
    "country": "United States of America",
    "lat": 40.785091,
    "lng": -73.968285,
    "name": "City Lights Loft",
    "description": "Experience NYC from a luxury loft",
    "price": 350,
    "avgRating": 4.8,
    "previewImage": "image_url_6"
    },
    "ReviewImages": [
      {
        "id": ,
        "url": "image url"
      }
    ]
  },
  
]


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
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
