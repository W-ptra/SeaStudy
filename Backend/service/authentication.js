const { hashPassword,comparePassword } = require("../helper/hashing");
const { createNewUser,getUserByEmail } = require("../model/userModel");

async function register(newUser){

    const isEmailAlreadyExist = await getUserByEmail(newUser.email);
    if(isEmailAlreadyExist.data !== null) 
        return { operation: false, message:"email already been used"};

    const passwordHash = await hashPassword(newUser.password);
    newUser.password = passwordHash;

    return await createNewUser(newUser);
}

async function login(email,password){

    const user = await getUserByEmail(email);
    if(user.data == null)
        return { operation: false,status: 404, message:"user doesn't exist"};

    const isPasswordMatch = await comparePassword(password,user.data.password);
    if(!isPasswordMatch)
        return { operation: false,status:401, message:"password incorrect"};

    return { operation: true, status: 200, message:"login sucessfully", user: user.data};
}

module.exports = { register,login };