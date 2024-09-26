const express = require('express');
const router = express.Router();
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const spot = require('../../db/models/spot');


// Get all spots 
router.get('/', async (req, res) => {
    const getAllSpots = await Spot.findAll();
    return res.status(200).json({Spots:getAllSpots});
});


// Get all spots owned by the current user
router.get('/current', async (req, res) => {
    const user = req.user;
    if (user) {
        const spotsByCurrentUser = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        })
        const arr = [];
        for (let i = 0; i < spotsByCurrentUser.length; i++) {
            let json = spotsByCurrentUser[i].toJSON();
            const spotReview = await Review.findAll({
                where: {
                    spotId: json.id
                }
            })
            let averageCount = 0;
            for (let j = 0; j < spotReview.length; j++) {
                let star = spotReview[j].stars;
                averageCount += star;
            }
            let average = averageCount / spotReview.length;
            json.avgRating = average;
            
            
            
            const spotPreviewImage = await SpotImage.findOne({
                where: {
                    spotId: json.id,
                    preview: true
                }
            })
            json.previewImage = spotPreviewImage.url;
            arr.push(json);
        };

        return res.status(200).json({Spots:arr})
    };

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
});

// Get all reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;
    const findSpot = await Spot.findByPk(spotId);
    if (!findSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    };
    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });
    return res.status(200).json({Reviews: reviews});
});

// Create a review for a Spot based on the Spot's id
router.post('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { review, stars } = req.body;
    const findSpot = await Spot.findByPk(spotId);
    if (!findSpot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    };
    if (!review) {
        return res.status(400).json({
            message: "Review text is required"
        })
    };
    if (!stars) {
        return res.status(400).json({
            message: "Stars must be an integer from 1 to 5"
        })
    };
    const allReviews = await Review.findAll({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    })
    if (allReviews) {
        return res.status(500).json({
            message: "User already has a review for this spot"
        }); 
    }

    const newReview = await Review.create({
        spotId,
        userId,
        review,
        stars,
    });
    return res.status(201).json(newReview)
});

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', async (req, res) => {
    const { spotId } = req.params;
    const user = req.user;
    const findSpotId = await Spot.findByPk(spotId);
    if (!findSpotId) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    };
    if(findSpotId.ownerId !== user.id) {
        const findBooking = await Booking.findAll({
            where
        })
    };
})


module.exports = router;