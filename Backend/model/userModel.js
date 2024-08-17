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
            status:     200,
            message:    `Successfully created new User with id: ${user.id}`
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation:  false,
            status:      500,
            message:    "Internal Server Error",
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
        }
        const user = await prisma.users.findUnique({where,select});
        return {
            operation:  true,
            status:     200,
            data:       user
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
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

        // Custom serializer for BigInt
        const serializeBigInt = (obj) => {
            return JSON.parse(JSON.stringify(obj, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));
        };

        return {
            operation:  true,
            status:     200,
            data:       serializeBigInt(user)
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
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
            status:         200,
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
            operation:  false,
            status:     500,
            message:    "Internal Server Error",
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