const { purchaseCourse } = require('../../service/payment');

describe('purchaseCourse', () => {
    // Test case for a valid course ID
    it('should return operation true and a success message for a valid course ID', async () => {
        const userId = 'user123';
        const courseId = 'course123';

        const result = await purchaseCourse(userId, courseId);

        expect(result.operation).toBe(true);
        expect(result.message).toBe('Successfully purchase course Course Name');
    });

    // Test case for an invalid course ID
    it('should return operation false, status 404, and an error message for an invalid course ID', async () => {
        const userId = 'user123';
        const courseId = 'invalidCourseId';

        const result = await purchaseCourse(userId, courseId);

        expect(result.operation).toBe(false);
        expect(result.status).toBe(404);
        expect(result.message).toBe('course with id invalidCourseId was not found');
    });

    // Test case for insufficient credit
    it('should return operation false, status 400, and an error message for insufficient credit', async () => {
        const userId = 'user123';
        const courseId = 'course123';

        const result = await purchaseCourse(userId, courseId);

        expect(result.operation).toBe(false);
        expect(result.status).toBe(400);
        expect(result.message).toBe('Credit is insufficient');
    });
});