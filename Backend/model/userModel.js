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
            message:    `Successfully created new User with id: ${user.id}`
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getUserByEmail(email){
    try{
        const where = { email }
        const select = {
            id:         true,
            email:      true,
            name:       true,
            password:   true,
            role:       true,
            credit:     true,
        }
        const user = await prisma.users.findUnique({where,select});
        return {
            operation:  true,
            data:       user
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getUserById(id){
    try{
        const where = { id }
        const select = {
            id:         true,
            email:      true,
            name:       true,
            role:       true,
            credit:     true,
        }
        const user = await prisma.users.findUnique({where,select})

        return {
            operation:  true,
            data:       user
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function updateUserSaldo(id,amount){
    try{
        const where = { id }
        const data = {credit: amount}
        const user = await prisma.users.update({where,data})
        return {
            operation:      true,
            message:        `Credit of user with id ${id} has changes`,
            userId:         id,
            credit:         user.credit
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    createNewUser,
    getUserByEmail,
    getUserById,
    updateUserSaldo
}