const {
    unenrollCourse
} = require('../../service/enrollment');

describe('unenrollCourse', () => {
    it('should return an object with status 400 and error message if courseId is null', async () => {
        const result = await unenrollCourse(null, 'userId');
        expect(result).toEqual({
            status: 400,
            operation: false,
            message: 'courseId and userId is required'
        });
    });

    it('should return an object with status 400 and error message if userId is null', async () => {
        const result = await unenrollCourse('courseId', null);
        expect(result).toEqual({
            status: 400,
            operation: false,
            message: 'courseId and userId is required'
        });
    });

    // Add more test cases here
});