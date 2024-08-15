//const { getCache,createCache } = require("./cache");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

async function createNewAssignment(newAssignment){
    try{
        const data = {
            name:          newAssignment.name,
            description:   newAssignment.description,
            topic:         { connect:{id: newAssignment.topicId} },
        }
        const assignment = await prisma.assigment.create({ data });
        return {
            operation:  true,
            status:     201,
            message:    `Successfully created new Assignment with id: ${assignment.id}`
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

async function getAssignmentById(id){
    //const cacheKey = `get assignment by id ${id}`

    try{
        //const cache = await getCache(cacheKey);
        // if(cache !== null)
        //     return{
        //         operation:  true,
        //         status:     200,
        //         data:       cache
        //     }

        const where = {id}
        const assignment = await prisma.assigment.findUnique({where});
        //createCache(cacheKey,assignment);
        return {
            operation:  true,
            status:     200,
            data:       assignment
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

async function updateAssignmentById(updatedAssignment){
    try{
        const where = { id:updatedAssignment.id }
        const data = {
            name:          updatedAssignment.name,
            description:   updatedAssignment.description,
            topicId:       updatedAssignment.topicId
        }
        const updating = await prisma.assigment.update({where,data})
        return {
            operation:  true,
            status:     200,
            message:    `Successfully update Assignment with id: ${updating.id}`
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

async function deleteAssignmentById(id){
    try{
        await prisma.assigment.delete({where:{id}})
        return {
            operation:  true,
            status:     200,
            message:    `Successfully delete Assignment with id: ${id}`
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
    getAssignmentById,
    createNewAssignment,
    updateAssignmentById,
    deleteAssignmentById
}