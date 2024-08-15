const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');
const { createPost, getPosts, deletePost } = require('../service/post');

router.get('/course/:courseId', async (req, res) => {
    const courseId = parseInt(req.params.courseId);

    const respond = await getPosts(courseId);

    if (!respond.operation) return res.status(400).json({ respond });

    return res.status(respond.status).json({ course: respond.data });
});

router.get('/:id', (req, res) => {
    
});

router.use(authenticateJWT("User"));
router.post('/', async (req, res) => {
    const newPost = {
        userId: Number(req.user.id),
        courseId: parseInt(req.body.courseId),
        message: req.body.message,
    };

    const respond = await createPost(newPost);

    if (!respond.operation)
        return res.status(400).json({ message: respond.message });

    return res.status(respond.status).json({ post: respond.message, payload: respond.data });
});

router.delete('/:postId', async (req, res) => {
    const respond = await deletePost(parseInt(req.params.postId));

    if (!respond.operation)
        return res.status(400).json({ message: respond.message });

    return res.status(respond.status).json({ message: respond.message });
});

module.exports = router;