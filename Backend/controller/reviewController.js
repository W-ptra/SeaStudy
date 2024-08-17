const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');
const { createReview, getReviews, deleteReview } = require('../service/review');

router.get('/course/:courseId', async (req, res) => {
    const courseId = parseInt(req.params.courseId);

    const respond = await getReviews(courseId);

    if (!respond.operation) return res.status(400).json({ respond });

    return res.status(respond.status).json({ reviews: respond.data });
});

router.use(authenticateJWT("User"));
router.post('/', async (req, res) => {
    const newReview = {
        userId: Number(req.user.id),
        courseId: parseInt(req.body.courseId),
        rating: parseInt(req.body.rating),
        comment: req.body.comment,
    };

    const respond = await createReview(newReview);

    if (!respond.operation)
        return res.status(400).json({ message: respond.message });

    return res.status(respond.status).json({ message: respond.message, data: respond.data });
});

router.delete('/:reviewId', async (req, res) => {
    const respond = await deleteReview(parseInt(req.params.reviewId));

    if (!respond.operation)
        return res.status(400).json({ message: respond.message });

    return res.status(respond.status).json({ message: respond.message });
});

module.exports = router;