const {comparePassword,hashPassword} = require("../helper/hashing");

test("hash passworld 123 and compare with 123",async ()=>{
    const password = "123"
    const hash = await hashPassword(password);
    const isMatch = await comparePassword(password,hash);

    expect(isMatch).toBe(true)
})