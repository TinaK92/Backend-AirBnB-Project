const express = require('express');
//const router = require("express").Router({ mergeParams: true });
const { requireAuth } = require("../../utils/auth");
const {
  Review,
  ReviewImage,
  Spot,
  User,
  SpotImage,
} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { literal } = require('sequelize');
const { where } = require("sequelize");
const { handleValidationErrors } = require("../../utils/validation");
const {
  spotAttributes,
  userAttributes,
  imageAttributes,
} = require("../../utils/attributes");

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5")
    .toInt(10),
  handleValidationErrors,
];

// const reviewImagesRouter = require("./review-images");
// router.use("/:reviewId/images", reviewImagesRouter);

// Get all reviews

// router.get('/', requireAuth, async (req, res, next) => {
//     const allReviews = await Review.findAll({
//         include: [
//             {
//                 model: models.Spot,
//                 attributes: {
//                     exclude: ["description", "createdAt","updatedAt"]
//                 }
//             }, 
//             {
//                 model: models.User,
//                 attributes: ["id", "firstName", "lastName"]
//             },
//             {
//                 model: models.ReviewImage,
//                 attributes: ["id", "url"]
//             }
//         ]
//     });
//     res.json(allReviews)
// });


// Get all reviews of the current user (get all reviews made by current user)
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found"})
    }

    if (user) {
        const currentReviews = await Review.findAll({
            where: {
                userId: req.user.id
            },
            include: [
                {
                    model: User,
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
                    model: ReviewImage,
                    attributes: ["id", "url"]
                }
            ]
        });
        return res.status(200).json({Reviews:currentReviews});
    };
    return res.json({ message: "No user is currently logged in"})
});

// Add an image to a Review based on the Review's id 
router.post('/:reviewId/images', async (req, res) => {
    const { url } = req.body;
    const reviewId = Number(req.params.reviewId);
    const findReview = await Review.findByPk(reviewId);
    if (!findReview) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    };
    const countImages = await ReviewImage.count({
        where: {
            reviewId
        }
    });
    if (countImages >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    };

    const addImg = await ReviewImage.create({
        reviewId,
        url
    });
    return res.status(201).json(addImg);
});


// Edit a Review
router.put('/:reviewId', async (req, res) => {
    const { review, stars } = req.body;
    const reviewId = Number(req.params.reviewId);
    const findReview = await Review.findByPk(reviewId);
    if (!findReview) {
        return res.status(404).json({
            message: "Review couldn't be found"
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
    if (review) findReview.review = review;
    if (stars) findReview.stars = stars;

    await findReview.save();
    return res.status(200).json(findReview);
});

// Delete a review
router.delete('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
    const user = req.user;
    console.log(user);
    const deleteReview = await Review.findByPk(reviewId);
    if (!deleteReview) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    };
    if(deleteReview.userId !== user.id) {
        return res.status(404).json({
            message: "Review must belong to the current user"
        })
    };
    await deleteReview.destroy();

    return res.status(200).json({
        message: 'Successfully deleted'
    });
})



module.exports = router;
