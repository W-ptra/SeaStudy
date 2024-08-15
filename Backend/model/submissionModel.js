const { getCache,createCache } = require("./cache");
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
            status:     201,
            message:    `Successfully created new Submission with id: ${topic.id}`
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

async function getAllSubmissionByAssignmentId(assignmentId){
    const cacheKey = `get all submission by assignment id ${assignmentId}`;
    try{
        const cache = await getCache(cacheKey);
        if(cache !== null)
            return{
                operation:  true,
                status:     200,
                data:       cache
            };

        const where = { assignmentId };
        const select = {
            id: true,
            score:  true,
            isGraded: true,
            content: true
        };
        const allAssigment = await prisma.submission.findMany({where,select});

        createCache(cacheKey,allAssigment);
        return {
            operation:  true,
            status:     200,
            data:       allAssigment
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

async function getSubmissionByUserId(userId){
    const cacheKey = `get submission by user id ${userId}`;
    try{
        const cache = await getCache(cacheKey);
        if(cache !== null)
            return{
                operation:  true,
                status:     200,
                data:       cache
            }

        const where = { userId }
        const select = {
            id: true,
            score:  true,
            isGraded: true,
            content: true
        }
        const allSubmission = await prisma.submission.findMany({where,select})
        createCache(cacheKey,allSubmission);
        return {
            operation:  true,
            status:     200,
            data:       allSubmission
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

async function getSubmissionById(id){
    const cacheKey = `get submission by id ${id}`;
    try{
        const cache = await getCache(cacheKey);
        if(cache !== null)
            return{
                operation:  true,
                status:     200,
                data:       cache
            }

        const where = { id }
        const submission = await prisma.submission.findUnique({where})
        createCache(cacheKey,submission);
        return {
            operation:  true,
            status:     200,
            data:       submission
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

async function updateSubmissionById(updatedSubmission){
    try{
        const where = { id:updatedSubmission.id }
        const data = {
            id:              updatedSubmission.id,
            score:           updatedSubmission.score,
            isGraded:        updatedSubmission.isGraded,
            content:         updatedSubmission.content,
            assignmentId:    updatedSubmission.assignmentId,
            userId:          updatedSubmission.userId
        }
        
        const updating = await prisma.submission.update({where,data})
        return {
            operation:  true,
            status:     200,
            message:    `Successfully update Submission with id: ${updating.id}`
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
    createNewSubmission,
    getAllSubmissionByAssignmentId,
    getSubmissionByUserId,
    getSubmissionById,
    updateSubmissionById
}