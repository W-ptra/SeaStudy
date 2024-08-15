const { createReview } = require("../../service/review");

describe("createReview", () => {
    it("should return an object with operation set to false and status 400 if required fields are missing", () => {
        const reviewData = {
            // Missing required fields
        };

        const result = createReview(reviewData);

        expect(result).toEqual({
            operation: false,
            status: 400,
            message: "Missing required fields",
        });
    });

    it("should call createReviewDB with the correct reviewData", () => {
        const reviewData = {
            userId: "user123",
            courseId: "course123",
            rating: 4,
        };

        const createReviewDB = jest.fn();
        require("../model/reviewModel").createReview = createReviewDB;

        createReview(reviewData);

        expect(createReviewDB).toHaveBeenCalledWith(reviewData);
    });

    // Add more test cases here if needed
});