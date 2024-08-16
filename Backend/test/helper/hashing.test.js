const {comparePassword,hashPassword} = require("../../helper/hashing");

test("test hash and compare password",async ()=>{
    const password = "123"
    const hash = await hashPassword(password);
    const isMatch = await comparePassword(password,hash);

    expect(isMatch).toBe(true)
})