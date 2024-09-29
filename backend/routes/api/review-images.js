const express = require('express');
const router = express.Router();
const { Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res) => {
    try {

        const { imageId } = req.params;

        const reviewImage = await ReviewImage.findByPk(imageId);

        if (!reviewImage) {
            return res.status(404).json({
                message: "Review Image couldn't be found"
            });
        }

        const review = await Review.findOne({
            where: {
                id: reviewImage.reviewId,
                userId: req.user.id
            }
        });

        if (!review) {
            return res.status(403).json({
                message: "Forbidden: You are not authorized to delete this image"
            });
        }

        await reviewImage.destroy();

        return res.status(200).json({
            message: "Successfully deleted"
        });
    } catch (error) {
        console.error('Error deleting review image:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
