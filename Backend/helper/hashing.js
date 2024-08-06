const { hash,compare } = require("bcrypt");
const saltRound = 10;

async function hashPassword(plainPassword){
    return await hash(plainPassword,saltRound);
}

async function comparePassword(plainPassword,hashedPassword){
    return await compare(plainPassword,hashedPassword);
}

module.exports = {hashPassword,comparePassword}