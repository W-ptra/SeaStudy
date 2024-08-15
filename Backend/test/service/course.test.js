const {
    getCourses,
    getCourseDetails,
    getEnrolledCourses,
    getCreatedCourses,
    getFilteredCourses,
    postCourse,
    updateCourseDetails,
    deleteCourse
} = require('../../service/course');

describe('Course API Tests', () => {
    test('getCourses should return all courses', async () => {
        const result = await getCourses();
        expect(result).toBeDefined();
    });

    test('getCourseDetails should return course details for valid courseId', async () => {
        const courseId = 1;
        const result = await getCourseDetails(courseId);
        expect(result.status).toBe(200);
    });

    test('getCourseDetails should return error for invalid courseId', async () => {
        const courseId = 'invalid';
        const result = await getCourseDetails(courseId);
        expect(result.status).toBe(400);
        expect(result.message).toBe("Invalid courseId");
    });

    test('getEnrolledCourses should return enrolled courses for valid userId', async () => {
        const userId = 1;
        const result = await getEnrolledCourses(userId);
        expect(result).toBeDefined();
    });

    test('getEnrolledCourses should return error for invalid userId', async () => {
        const userId = 'invalid';
        const result = await getEnrolledCourses(userId);
        expect(result.status).toBe(400);
        expect(result.message).toBe("Invalid userId");
    });

    test('getCreatedCourses should return created courses for valid userId', async () => {
        const userId = 1;
        const result = await getCreatedCourses(userId);
        expect(result).toBeDefined();
    });

    test('getCreatedCourses should return error for invalid userId', async () => {
        const userId = 'invalid';
        const result = await getCreatedCourses(userId);
        expect(result.status).toBe(400);
        expect(result.message).toBe("Invalid userId");
    });

    test('getFilteredCourses should return filtered courses for valid filter', async () => {
        const filter = { minRating: 1, maxRating: 5 };
        const result = await getFilteredCourses(filter);
        expect(result).toBeDefined();
    });

    test('getFilteredCourses should return error for invalid filter', async () => {
        const filter = { minRating: -1, maxRating: 6 };
        const result = await getFilteredCourses(filter);
        expect(result.status).toBe(400);
        expect(result.message).toBe("minRating and maxRating must be between 0 and 5");
    });

    test('postCourse should create a new course for valid input', async () => {
        const course = { userId: 1, name: 'New Course' };
        const result = await postCourse(course);
        expect(result).toBeDefined();
    });

    test('postCourse should return error for missing userId', async () => {
        const course = { name: 'New Course' };
        const result = await postCourse(course);
        expect(result.status).toBe(400);
        expect(result.message).toBe("userId is required");
    });

    test('postCourse should return error for long course name', async () => {
        const course = { userId: 1, name: 'A'.repeat(151) };
        const result = await postCourse(course);
        expect(result.status).toBe(400);
        expect(result.message).toBe("name must be less than 150 characters");
    });

    test('updateCourseDetails should update course for valid input', async () => {
        const course = { userId: 1, name: 'Updated Course' };
        const result = await updateCourseDetails(course);
        expect(result).toBeDefined();
    });

    test('updateCourseDetails should return error for missing userId', async () => {
        const course = { name: 'Updated Course' };
        const result = await updateCourseDetails(course);
        expect(result.status).toBe(400);
        expect(result.message).toBe("userId is required");
    });

    test('updateCourseDetails should return error for long course name', async () => {
        const course = { userId: 1, name: 'A'.repeat(151) };
        const result = await updateCourseDetails(course);
        expect(result.status).toBe(400);
        expect(result.message).toBe("name must be less than 150 characters");
    });

    test('deleteCourse should delete course for valid courseId', async () => {
        const courseId = 1;
        const result = await deleteCourse(courseId);
        expect(result).toBeDefined();
    });

    test('deleteCourse should return error for missing courseId', async () => {
        const courseId = null;
        const result = await deleteCourse(courseId);
        expect(result.status).toBe(400);
        expect(result.message).toBe("courseId is required");
    });
});