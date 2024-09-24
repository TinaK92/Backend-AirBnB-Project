const express = require('express');
const router = express.Router();
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');  // Assuming Spot is defined in your models
const user = require('../../db/models/user');

// Get all spots 
router.get('/', async (req, res) => {
    const getAllSpots = await Spot.findAll();  // Fetch all spots from the database
    return res.status(200).json(getAllSpots);  // Correct the statusCode method
});


// Get all spots owned by the current user
router.get('/current', async (req, res) => {
    const user = req.user;
    const spotsByCurrentUser = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })
    return res.status(200).json(spotsByCurrentUser)
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({
            message: "Couldn't find a Spot with the specified id"
        })
    }
    return res.status(200).json(spot);
});

// Create a spot 
router.post('/', async (req, res) => {
    const user = req.user.ownerId
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const newSpot = await Spot.create({
        ownerid: user,
        address,
        city, 
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    if (!newSpot) {
        return res.status(400).json({
            message: 'Body validation error'
        })
    };
    return res.status(201).json(newSpot)
})


module.exports = router;