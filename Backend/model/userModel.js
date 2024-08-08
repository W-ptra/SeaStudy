const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

async function createNewUser(newUser){
    try{
        const data = {
            email:      newUser.email,
            name:       newUser.name,
            password:   newUser.password,
            role:       newUser.role,
            credit:     0,
        }
        const user = await prisma.users.create({ data });
        return {
            operation:  true,
            message:    `Sucessfully created new User with id: ${user.id}`
        }
    }
    catch (err){
        return {
            operation:  false,
            message:    err
        }
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getUserByEmail(email){
    try{
        const where = { email }
        const user = await prisma.users.findUnique({where})
        return {
            operation:  true,
            data:       user
        }
    }
    catch (err){
        return {
            operation:  false,
            message:    err
        }
    }
    finally {
        await prisma.$disconnect();
    }
}

module.exports = {createNewUser,getUserByEmail}