const { createNewUser, getUserByEmail } = require('../model/userModel');

test("insert new user into user table",async ()=>{
    const newUser = {
        email:  "test@email.com",
        name:   "test user",
        password:"test password",
    }

    const result = await createNewUser(newUser);
    const resultShouldBe = {
        operation:  true,
        message:    `Sucessfully created new User with id: 1`
    }
    expect(result).toEqual(resultShouldBe)
})

test("get user with email",async ()=>{
    const email = "test@email.com";
    const result = await getUserByEmail(email);
    const resultShouldBe = {
        operation: true,
        data: {
          id: 1,
          email: 'test@email.com',
          name: 'test user',
          password: 'test password',
          role: 'User',
          credit: 0n,
          createdAt: new Date('2024-08-08T12:00:34.563Z'),
          updatedAt: new Date('2024-08-08T12:00:34.563Z')
        }
    }
    expect(result).toEqual(resultShouldBe)
})