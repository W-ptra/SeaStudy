const {comparePassword,hashPassword} = require("../helper/hashing");

test("hash passworld 123 and compare with 123",async ()=>{
    const password = "123"
    const hash = await hashPassword(password);
    const isMatch = await comparePassword(password,hash);

    expect(isMatch).toBe(true)
})

test("add 1 + 2 should be 3",()=>{
    expect(1+2).toBe(3)
})

//tets("Login with 'test@yahoo' & password '123' ")