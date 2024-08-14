const userModel = require("../../model/userModel");

test("Test create new User",async ()=>{

    const user = {
        email:      "test@email.com",
        name:       "test",
        password:   "test",
        role:       "User",
        credit:     0,
    }

    const result = await userModel.createNewUser(user);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.message).toContain("Successfully created new User with id:");
})

test("Test create a double User",async ()=>{

    const user = {
        email:      "test@email.com",
        name:       "test",
        password:   "test",
        role:       "User",
        credit:     0,
    }

    const result = await userModel.createNewUser(user);

    expect(result.operation).toBe(false);
    expect(result.status).toBe(500);
    expect(result.message).not.toContain("Successfully created new User with id:");
})

test("Test get a user by id",async ()=>{

    const id = 2;

    const result = await userModel.getUserById(id);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
})

test("Test get a user by id but not found",async ()=>{

    const id = 999;

    const result = await userModel.getUserById(id);

    expect(result.data).toBe(null);
})

test("Test get a user by email",async ()=>{

    const email = "test@email.com";

    const result = await userModel.getUserByEmail(email);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
})

test("Test get a user by email but not found",async ()=>{

    const email = "test99999999999@email.com";

    const result = await userModel.getUserByEmail(email);

    expect(result.data).toBe(null);
})

test("Test update user saldo",async ()=>{

    const id = 2;
    const amount = 2000;

    const result = await userModel.updateUserSaldo(id,amount);

    expect(result.operation).toBe(true);
    expect(result.status).toBe(200);
    expect(result.userId).toBe(2);
    expect(result.credit).toBe(2000n);
})