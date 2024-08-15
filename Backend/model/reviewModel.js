const { getCache,createCache } = require("./cache");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createReview = async (data) => {
    try {
        // Check if the user has already reviewed the course
        const existingReview = await prisma.review.findFirst({
            where: {
                userId: data.userId,
                courseId: data.courseId,
            },
        });

        if (existingReview) {
            return {
                operation: false,
                status: 400,
                message: "User has already reviewed this course",
            };
        }

        // Create the review
        const review = await prisma.review.create({
            data: {
                userId: data.userId,
                courseId: data.courseId,
                rating: data.rating,
                comment: data.comment,
            },
        });

        // Calculate the new average rating
        const reviews = await prisma.review.findMany({
            where: { courseId: data.courseId },
            select: { rating: true },
        });

        const totalRatings = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );
        const avgRating = totalRatings / reviews.length;

        // Update the course with the new average rating
        await prisma.course.update({
            where: { id: data.courseId },
            data: { avgRating: avgRating },
        });

        return {
            operation: true,
            status:     201,
            message:    "Review created successfully",
            data:       review,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======");

        return {
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
        };
    }
};

const getReviewsByCourseId = async (id) => {
    const cacheKey = `get review by course id ${id}`;
    try {
        const cache = await getCache(cacheKey);
        if(cache !== null)
            return{
                operation:  true,
                status:     200,
                data:       cache
            }

        const reviews = await prisma.review.findMany({
            where: {
                courseId: id,
            },
        });

        createCache(cacheKey,reviews);
        return {
            operation: true,
            status: 200,
            data: reviews,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======");

        return {
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
        };
    }
};

const getReviewById = async (id) => {
    const cacheKey = `get review by id ${id}`;
    try {
        const cache = await getCache(cacheKey);
        if(cache !== null)
            return{
                operation:  true,
                status:     200,
                data:       cache
            }

        const review = await prisma.review.findUnique({
            where: {
                id,
            },
        });

        createCache(cacheKey,review);
        return {
            operation: true,
            status: 200,
            data: review,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======");

        return {
            operation: false,
            message: "Internal Server Error",
        };
    }
};

const deleteReviewById = async (id) => {
    console.log("Deleting review with id: ", id);
    try {
        const review = await getReviewById(id);

        if (review.data === null)
            return {
                operation: false,
                status: 404,
                message: "Review does not exist",
            };

        await prisma.review.delete({
            where: {
                id,
            },
        });
        return {
            operation: true,
            status: 200,
            message: "Review deleted successfully",
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======");

        return {
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
        };
    }
};

module.exports = {
    createReview,
    getReviewsByCourseId,
    getReviewById,
    deleteReviewById,
};