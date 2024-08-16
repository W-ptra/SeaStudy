const reviewModel = require("../../model/reviewModel");

test("Test create new review",async ()=>{
    const review = {
        userId:     10,
        courseId:   12,
        rating:     5,
        comment:    "test review",
    };

    const result = await reviewModel.createReview(review);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(201);
    expect(result.data).not.toBe(null);
    expect(result.message).toContain("Review created successfully");
})

test("Test get review by courseId",async ()=>{
    const id = 10;

    const result = await reviewModel.getReviewsByCourseId(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test get review by id",async ()=>{
    const id = 9;

    const result = await reviewModel.getReviewById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).not.toBe(null);
})

test("Test delete review",async ()=>{
    const id = 12;

    const result = await reviewModel.deleteReviewById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.message).toContain("Review deleted successfully");
})