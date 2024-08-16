const { getTopicById } = require('./topic');

describe('getTopicById', () => {
    it('should return the topic when it exists', async () => {
        const userId = 'user123';
        const id = 'topic123';

        // Mock the topicModel.getTopicById function
        const mockGetTopicById = jest.fn().mockResolvedValue({
            data: {
                id: 'topic123',
                courseId: 'course123',
                // Add other properties as needed
            },
        });
        jest.mock('../model/topicModel', () => ({
            getTopicById: mockGetTopicById,
        }));

        // Mock the getEnrollmentsByUserId function
        const mockGetEnrollmentsByUserId = jest.fn().mockResolvedValue({
            data: {
                // Add necessary properties
            },
        });
        jest.mock('../model/enrollmentModel', () => ({
            getEnrollmentsByUserId: mockGetEnrollmentsByUserId,
        }));

        // Call the getTopicById function
        const result = await getTopicById(userId, id);

        // Assert the result
        expect(result).toEqual({
            operation: true,
            status: 200,
            // Add other expected properties
        });

        // Verify that the mock functions were called with the correct arguments
        expect(mockGetTopicById).toHaveBeenCalledWith(id);
        expect(mockGetEnrollmentsByUserId).toHaveBeenCalledWith(userId, 'course123');
    });

    it('should return an error when the topic does not exist', async () => {
        const userId = 'user123';
        const id = 'topic123';

        // Mock the topicModel.getTopicById function to return null
        const mockGetTopicById = jest.fn().mockResolvedValue({
            data: null,
        });
        jest.mock('../model/topicModel', () => ({
            getTopicById: mockGetTopicById,
        }));

        // Call the getTopicById function
        const result = await getTopicById(userId, id);

        // Assert the result
        expect(result).toEqual({
            operation: false,
            status: 404,
            message: `topic with id ${id} was not found`,
        });

        // Verify that the mock function was called with the correct argument
        expect(mockGetTopicById).toHaveBeenCalledWith(id);
    });

    it('should return an error when the user is not enrolled in the course', async () => {
        const userId = 'user123';
        const id = 'topic123';

        // Mock the topicModel.getTopicById function
        const mockGetTopicById = jest.fn().mockResolvedValue({
            data: {
                id: 'topic123',
                courseId: 'course123',
                // Add other properties as needed
            },
        });
        jest.mock('../model/topicModel', () => ({
            getTopicById: mockGetTopicById,
        }));

        // Mock the getEnrollmentsByUserId function to return null
        const mockGetEnrollmentsByUserId = jest.fn().mockResolvedValue({
            data: null,
        });
        jest.mock('../model/enrollmentModel', () => ({
            getEnrollmentsByUserId: mockGetEnrollmentsByUserId,
        }));

        // Call the getTopicById function
        const result = await getTopicById(userId, id);

        // Assert the result
        expect(result).toEqual({
            operation: false,
            status: 403,
            message: `User with id ${userId} is not enrolled on Course with id course123`,
        });

        // Verify that the mock functions were called with the correct arguments
        expect(mockGetTopicById).toHaveBeenCalledWith(id);
        expect(mockGetEnrollmentsByUserId).toHaveBeenCalledWith(userId, 'course123');
    });
});