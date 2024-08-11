const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

async function createNewSubmission(newSubmission){
    try{
        const data = {
            score:           newSubmission.score,
            isGraded:        newSubmission.isGraded,
            content:         newSubmission.content,
            assignment:      { connect:{id: newSubmission.assignmentId} },
            user:            { connect:{id: newSubmission.userId} }
        }
        const topic = await prisma.submission.create({ data });
        return {
            operation:  true,
            message:    `Successfully created new Submission with id: ${topic.id}`
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

async function getAllSubmissionByAssignmentId(assignmentId){
    try{
        const where = { assignmentId }
        const select = {
            id: true,
            score:  true,
            isGraded: true,
            content: true
        }
        const allAssigment = await prisma.submission.findMany({where,select})
        return {
            operation:  true,
            data:       allAssigment
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

async function getSubmissionByUserId(userId){
    try{
        const where = { userId }
        const select = {
            id: true,
            score:  true,
            isGraded: true,
            content: true
        }
        const allSubmission = await prisma.submission.findMany({where,select})
        return {
            operation:  true,
            data:       allSubmission
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

async function updateSubmissionById(updatedSubmission){
    try{
        const where = { id:updatedSubmission.id }
        const data = {
            id:              updatedSubmission.id,
            score:           updatedSubmission.score,
            isGraded:        updatedSubmission.isGraded,
            content:         updatedSubmission.content,
            assignmentId:    updatedSubmission.assignmentId,
            userId:    updatedSubmission.userId
        }
        
        const updating = await prisma.submission.update({where,data})
        return {
            operation:  true,
            message:    `Successfully update Submission with id: ${updating.id}`
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
    createNewSubmission,
    getAllSubmissionByAssignmentId,
    getSubmissionByUserId,
    updateSubmissionById
}