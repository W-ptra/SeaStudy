const {register,login} = require("../service/authentication");

test("Test Register new User",async ()=>{
    const mockNewUser = {
        email: "Dadan@gmail.com",
        name: "bobon bobo",
        password: "bobon123",
        role: "User"
    }

    const mockRegisterSuccess = await register(mockNewUser);
    expect(mockRegisterSuccess.operation).toBe(true);
    expect(mockRegisterSuccess.message).toContain("Successfully created new User with id:");

    const mockRegisterFail = await register(mockNewUser);
    expect(mockRegisterFail.operation).not.toBe(true);
    expect(mockRegisterFail.message).toContain("email already been used");
});

test("Test Login",async ()=>{
    
    let email= "Bobon@gmail.comX"
    let password= "bobon123X"
    

    let mockLoginFail = await login(email,password);
    expect(mockLoginFail.operation).not.toBe(true);
    expect(mockLoginFail.message).toContain("user doesn't exist");

    email = "Dadan@gmail.com";
    mockLoginFail = await login(email,password);
    expect(mockLoginFail.operation).not.toBe(true);
    expect(mockLoginFail.message).toContain("password incorrect");

    password= "bobon123"
    const mockLoginSuccess = await login(email,password);
    expect(mockLoginSuccess.operation).toBe(true);
    expect(mockLoginSuccess.message).toContain("login sucessfully");
});