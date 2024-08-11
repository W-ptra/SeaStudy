const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

async function getAssignmentById(id){
    try{
        const where = {id}
        const assignment = await prisma.assigment.findUnique({where});
        return {
            operation:  true,
            data:    assignment
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
            message:    `Successfully created new Assignment with id: ${assignment.id}`
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
            message:    `Successfully update Assignment with id: ${updating.id}`
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

async function deleteAssignmentById(id){
    try{
        await prisma.assigment.delete({where:{id}})
        return {
            operation:  true,
            message:    `Successfully delete Assignment with id: ${id}`
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
    getAssignmentById,
    createNewAssignment,
    updateAssignmentById,
    deleteAssignmentById
}