const express = require('express');
const router = express.Router();
const models = require('../../db/models');

router.get('/', async (req, res) => {
    const allReviews = await models.Review.findAll({
        include: [
            {
                model: models.Spot,
                attributes: {
                    exclude: ["description", "createdAt","updatedAt"]
                }
            }, 
            {
                model: models.User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: models.ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    });
    res.json(allReviews)
});

// Get all reviews of the current user (get all reviews made by current user)
router.get('/current', async (req, res) => {
    if (req.user) {
        const currentReviews = await models.Review.findAll({
            where: {
                userId: req.user.id
            },
            include: [
                {
                    model: models.User,
                    attributes: ["id", "firstName", "lastName"]
                }, 
                {
                    model: Spot,
                    attributes: {
                        exclude: ['description', 'createdAt', 'updatedAt'],
                        include: [
                            [
                                literal(`(
                                    SELECT url
                                    FROM SpotImages AS SpotImage
                                    WHERE
                                        SpotImage.preview = true
                                        AND
                                        SpotImage.spotId = Spot.id
                                )`),
                                'previewImage',
                            ],
                        ]
                    },
                },
                {
                    model: models.ReviewImage,
                    attributes: ["id", "url"]
                }
            ]
        });
        return res.status(200).json({Reviews:currentReviews});
    }
    return res.json({ message: "No user is currently logged in"})
});

// Get all reviews by a Spot's id
router.get('/spots/:spotId/reviews', async (req, res) => {
    
})



module.exports = router;
