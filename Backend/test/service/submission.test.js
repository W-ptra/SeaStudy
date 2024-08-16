const { createNewSubmission } = require('../../service/submission');

describe('createNewSubmission', () => {
    it('should return an error if the assignment is not found', async () => {
        const newSubmission = {
            assignmentId: 123,
            userId: 456,
            // other properties...
        };

        const result = await createNewSubmission(newSubmission);

        expect(result.operation).toBe(false);
        expect(result.status).toBe(404);
        expect(result.message).toBe('Assignment with id 123 was not found');
    });

    it('should return an error if the user is not enrolled', async () => {
        const newSubmission = {
            assignmentId: 789,
            userId: 456,
            // other properties...
        };

        const result = await createNewSubmission(newSubmission);

        expect(result.operation).toBe(false);
        expect(result.status).toBe(403);
        expect(result.message).toBe('User is not enrolled');
    });

    it('should create a new submission', async () => {
        const newSubmission = {
            assignmentId: 789,
            userId: 456,
            // other properties...
        };

        const result = await createNewSubmission(newSubmission);

        expect(result).toBeDefined();
        // add more assertions as needed...
    });
});