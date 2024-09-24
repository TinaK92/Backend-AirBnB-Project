'use strict';

const { Spot } = require('../models');
const spot = require('../models/spot');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spots = [
  {
    "id": 1,
    "ownerId": 1,
    "address": "456 Tech Park",
    "city": "Seattle",
    "state": "Washington",
    "country": "United States of America",
    "lat": 47.609722,
    "lng": -122.333056,
    "name": "Developer's Den",
    "description": "A cozy place to code",
    "price": 150,
    "createdAt": "2022-01-10 10:20:30",
    "updatedAt": "2022-01-10 10:20:30",
    "avgRating": 4.8,
    "previewImage": "image_url_2"
  },
  {
    "id": 2,
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
    "createdAt": "2022-02-15 14:45:12",
    "updatedAt": "2022-02-15 14:45:12",
    "avgRating": 4.9,
    "previewImage": "image_url_3"
  },
  {
    "id": 3,
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
    "createdAt": "2022-03-25 08:10:05",
    "updatedAt": "2022-03-25 08:10:05",
    "avgRating": 4.7,
    "previewImage": "image_url_4"
  },
  {
    "id": 4,
    "ownerId": 4,
    "address": "555 Mountain Pass",
    "city": "Aspen",
    "state": "Colorado",
    "country": "United States of America",
    "lat": 39.1911,
    "lng": -106.8175,
    "name": "Mountain Escape",
    "description": "Relax in the heart of the Rockies",
    "price": 400,
    "createdAt": "2022-04-18 17:30:50",
    "updatedAt": "2022-04-18 17:30:50",
    "avgRating": 4.6,
    "previewImage": "image_url_5"
  },
  {
    "id": 5,
    "ownerId": 5,
    "address": "909 Central Park West",
    "city": "New York",
    "state": "New York",
    "country": "United States of America",
    "lat": 40.785091,
    "lng": -73.968285,
    "name": "City Lights Loft",
    "description": "Experience NYC from a luxury loft",
    "price": 350,
    "createdAt": "2022-05-02 09:15:30",
    "updatedAt": "2022-05-02 09:15:30",
    "avgRating": 4.8,
    "previewImage": "image_url_6"
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
    for (let i = 0; i < spots.length; i++) {
      Spot.create(spots[i]);
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let i = 0; i < spots.length; i++) {
      Spot.destroy({
        where: 
          spots[i]
      });
    }
  }
};

