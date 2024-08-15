const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth");
const {
    getCourses,
    getCourseDetails,
    getFilteredCourses,
    postCourse,
    updateCourseDetails,
    deleteCourse,
} = require("../service/course");

router.get("/filter", async (req, res) => {
    const category = req.query.category;
    const level = req.query.level;
    let minRating = req.query.minRating;
    let maxRating = req.query.maxRating;

    if (minRating !== undefined) {
        minRating = parseFloat(minRating);
    }

    if (maxRating !== undefined) {
        maxRating = parseFloat(maxRating);
    }

    const respond = await getFilteredCourses({
        category,
        level,
        minRating,
        maxRating,
    });

    if (!respond.operation) return res.status(400).json({ respond });

    return res.status(respond.status).json({ course: respond.data });
});

router.get("/", async (req, res) => {
    const respond = await getCourses();

    if (!respond.operation) return res.status(400).json({ respond });

    return res.status(respond.status).json({ courses: respond.data });
});

router.get("/:courseId", async (req, res) => {
    const courseId = parseInt(req.params.courseId);

    const respond = await getCourseDetails(courseId);

    if (!respond.operation) return res.status(400).json({ respond });

    return res
        .status(respond.status)
        .json({ course: respond.course, topics: respond.topics });
});

// Instructor role operations
router.use(authenticateJWT("Instructor"));

router.post("/", async (req, res) => {
    const newCourse = {
        name:           req.body.name,
        description:    req.body.description,
        category:       req.body.category,
        level:          req.body.level,
        price:          req.body.price,
        userId:         req.user.id,
    };

    const respond = await postCourse(newCourse);

    if (!respond.operation) return res.status(400).json({ respond });

    return res.status(respond.status).json({ message: respond.message });
});

router.put("/:courseId", async (req, res) => {
    const updatedCourse = {
        id: parseInt(req.params.courseId),
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        level: req.body.level,
        price: req.body.price,
        userId: req.user.id,
    };

    const respond = await updateCourseDetails(updatedCourse);

    if (!respond.operation)
        return res.status(400).json({ message: "Bad request" });

    return res.status(respond.status).json({ message: respond.message });
});

router.delete("/:courseId", async (req, res) => {
    const respond = await deleteCourse(parseInt(req.params.courseId));

    if (!respond.operation)
        return res.status(404).json({ message: "Course does not exist" });

    return res.status(respond.status).json({ message: respond.message });
});

module.exports = router;
