const {
    getCourseDetails
} = require("../../service/course");

describe("get Course Details", () => {
    it("should return course details with status 200 if courseId is valid", async () => {
        const courseId = 1; // Replace with a valid courseId

        const result = await getCourseDetails(courseId);

        expect(result.operation).toBe(true);
        expect(result.status).toBe(200);
        expect(result.course).toBeDefined();
        expect(result.topics).toBeDefined();
    });

    it("should return error message with status 400 if courseId is invalid", async () => {
        const courseId = "invalid"; // Replace with an invalid courseId

        const result = await getCourseDetails(courseId);

        expect(result.operation).toBe(false);
        expect(result.status).toBe(400);
        expect(result.message).toBeDefined();
    });
});