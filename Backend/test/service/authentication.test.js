const { login, register } = require('../../service/authentication');

describe('register', () => {
    it('should return an error when email is already used', async () => {
        const newUser = {
            email: 'test@example.com',
            password: 'password123'
        };
    
        const result = await register(newUser);
    
        expect(result.operation).toBe(false);
        expect(result.message).toBe('email already been used');
    });
});

describe('login', () => {
    it('should return user data when email and password are correct', async () => {
        const email = 'test@example.com';
        const password = 'password123';

        const result = await login(email, password);

        expect(result.operation).toBe(true);
        expect(result.status).toBe(200);
        expect(result.message).toBe('login sucessfully');
        expect(result.user).toBeDefined();
    });

    it('should return an error when user email does not exist', async () => {
        const email = 'nonexistent@example.com';
        const password = 'password123';

        const result = await login(email, password);

        expect(result.operation).toBe(false);
        expect(result.status).toBe(404);
        expect(result.message).toBe("user doesn't exist");
    });

    it('should return an error when password is incorrect', async () => {
        const email = 'test@example.com';
        const password = 'incorrectpassword';

        const result = await login(email, password);

        expect(result.operation).toBe(false);
        expect(result.status).toBe(401);
        expect(result.message).toBe('password incorrect');
    });
});