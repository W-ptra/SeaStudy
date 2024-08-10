const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createNewCompletion(newCompletion) {
    try {
        const data = {
            topic: { connect:{id: newCompletion.topicId} },
            user: { connect:{id: newCompletion.userId} },
        };

        const completion = await prisma.completion.create({ data });

        return {
            operation: true,
            message: `Successfully created new Completion with id: ${completion.id}`,
        };
    } catch (err) {
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            message: "Internal Server Error",
        };
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {createNewCompletion}