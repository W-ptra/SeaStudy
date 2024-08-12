const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createReview = async (data) => {
    try {
        const review = await prisma.review.create({
            data,
        });
        return review;
    } catch (error) {
        throw new Error(`Failed to create review: ${error.message}`);
    }
};

const getReviewById = async (id) => {
    try {
        const review = await prisma.review.findUnique({
            where: {
                id,
            },
        });
        return review;
    } catch (error) {
        throw new Error(`Failed to get review: ${error.message}`);
    }
};

const updateReview = async (id, data) => {
    try {
        const review = await prisma.review.update({
            where: {
                id,
            },
            data,
        });
        return review;
    } catch (error) {
        throw new Error(`Failed to update review: ${error.message}`);
    }
};

const deleteReview = async (id) => {
    try {
        const review = await prisma.review.delete({
            where: {
                id,
            },
        });
        return review;
    } catch (error) {
        throw new Error(`Failed to delete review: ${error.message}`);
    }
};

module.exports = {
    createReview,
    getReviewById,
    updateReview,
    deleteReview,
};