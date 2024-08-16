const { createPost } = require('../../service/post');

describe('createPost', () => {
    it('should return an object with operation false, status 400, and message "Message is required" if postData.message is empty', async () => {
        const postData = {
            message: '',
        };

        const result = await createPost(postData);

        expect(result).toEqual({
            operation: false,
            status: 400,
            message: 'Message is required',
        });
    });

    it('should call createPostDB with the correct postData', async () => {
        const postData = {
            message: 'Test message',
        };

        const createPostDB = jest.fn();

        jest.mock('../model/postModel', () => ({
            createPostDB,
        }));

        await createPost(postData);

        expect(createPostDB).toHaveBeenCalledWith(postData);
    });
});