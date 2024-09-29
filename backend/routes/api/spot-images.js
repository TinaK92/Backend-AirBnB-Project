const express = require('express');
const router = express.Router();
const { Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res) => {
    try {

        const { imageId } = req.params;

        const spotImage = await SpotImage.findByPk(imageId);

        if (!spotImage) {
            return res.status(404).json({
                message: "Spot Image couldn't be found"
            });
        }

        const spot = await Spot.findOne({
            where: {
                id: spotImage.spotId,
                ownerId: req.user.id
            }
        });

        if (!spot) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        await spotImage.destroy();

        return res.status(200).json({
            message: "Successfully deleted"
        });
    } catch (error) {
        console.error('Error deleting spot image:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
