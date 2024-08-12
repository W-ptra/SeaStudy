const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const { getEnrolledUsers, enrollCourse, unenrollCourse } = require("../service/enrollment");

router.get("/:courseId", async (req, res) => {
    const courseId = parseInt(req.params.courseId);

    const respond = await getEnrolledUsers(courseId);

    if (!respond.operation) return res.status(400).json({ respond });

    return res.status(respond.status).json({ course: respond.data });
});

// Logged in users can enroll and unenroll from a course
router.use(authenticateJWT("User"));
router.post("/:courseId", async (req, res) => {
    const courseId = parseInt(req.params.courseId);

    const respond = await enrollCourse(courseId, req.user.id);

    if (!respond.operation) return res.status(400).json({ respond });

    return res.status(respond.status).json({ message: respond.message });
});

router.delete("/:courseId", async (req, res) => {
    const courseId = parseInt(req.params.courseId);

    const respond = await unenrollCourse(courseId, req.user.id);

    if (!respond.operation) return res.status(400).json({ respond });

    return res.status(respond.status).json({ message: respond.message });
});

module.exports = router;