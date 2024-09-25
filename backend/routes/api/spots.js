const express = require('express');
const router = express.Router();
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');


// Get all spots 
router.get('/', async (req, res) => {
    const getAllSpots = await Spot.findAll();
    return res.status(200).json(getAllSpots);
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
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;
    const newSpot = await Spot.create({
        ownerId,
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
});

// Add an image to a Spot based on the Spot's id
router.post('/:spotId/images', async (req, res) => {
    const { url, preview } = req.body;
    const spotId = req.params.spotId;
    const newImg = await SpotImage.create({
        spotId,
        url,
        preview,
    });
    if (!newImg) {
        return res.status(404).json({
            message: "Couldn't find a Spot with the specified id"
        })
    };
    return res.status(201).json(newImg);
});

// Edit a Spot
router.put('/:spotId', async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const updateSpot = req.params.spotId;
    if (!updateSpot) {
        return res.status(404).json({
            message: "Couldn't find a Spot with the specified id"
        })
    };
    const editSpot = await Spot.findByPk(updateSpot);

    if (address) editSpot.address = address;
    if (city) editSpot.city = city;
    if (state) editSpot.state = state;
    if (country) editSpot.country = country;
    if (lat) editSpot.lat = lat;
    if (lng) editSpot.lng = lng;
    if (name) editSpot.name = name;
    if (description) editSpot.description = description;
    if (price) editSpot.price = price;


    

    await editSpot.save();
    return res.status(200).json(editSpot);
})

// Delete a Spot
router.delete('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const user = req.user;

    const deleteSpot = await Spot.findByPk(spotId);
    console.log(deleteSpot)
    if(!deleteSpot) {
        return res.status(404).json({
            message: "Couldn't find a Spot with the specified id"
        });
    }

    if(deleteSpot.ownerId !== user.id) {
        return res.status(404).json({
            message: "Spot must belong to the current user"
        })
    }

    await deleteSpot.destroy();

    return res.status(200).json({
        deleteSpot,
        message: 'Successfully deleted'
    });
})

module.exports = router;