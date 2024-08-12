const {
    createReview : createReviewDB,
    getReviewsByCourseId: getReviewDB,
    deleteReviewById: deleteReviewDB,
} = require("../model/reviewModel");

function createReview(reviewData) {
    if (!reviewData.userId || !reviewData.courseId || !reviewData.rating) {
        return {
            operation: false,
            status: 400,
            message: "Missing required fields",
        };
    }

    return createReviewDB(reviewData);
}

function getReviews(reviewId) {
    return getReviewDB(reviewId);
}

function deleteReview(reviewId) {
    return deleteReviewDB(reviewId);
}

// Export the functions
module.exports = {
    createReview,
    getReviews,
    deleteReview
};