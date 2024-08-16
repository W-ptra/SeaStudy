const { getEnrolledCourses } = require("./service/user");

describe("getEnrolledCourses", () => {
    it("should return enrolled courses for a valid userId", async () => {
        const userId = 1;
        const enrolledCourses = await getEnrolledCourses(userId);
        expect(enrolledCourses).toEqual(/* expected enrolled courses */);
    });

    it("should return an error for an invalid userId", async () => {
        const userId = "invalid";
        const result = await getEnrolledCourses(userId);
        expect(result).toEqual({
            operation: false,
            status: 400,
            message: "Invalid userId",
        });
    });
});