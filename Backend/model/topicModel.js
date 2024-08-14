const { getCache,createCache } = require("./cache");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;

async function createNewTopic(newTopic){
    try{
        const data = {
            title:          newTopic.title,
            description:    newTopic.description,
            course:         { connect:{id: newTopic.courseId} },
        }
        const topic = await prisma.topic.create({ data });
        return {
            operation:  true,
            message:    `Successfully created new Topic with id: ${topic.id}`
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            status: 500,
            message: "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getAllTopicByCourseId(courseId){
    const cacheKey = `get all topic by course id ${id}`;
    try{
        const cache = await getCache(cacheKey);
        if(cache !== null)
            return{
                operation:  true,
                status:     200,
                data:       cache
            }

        const where = { courseId }
        const select = { 
            id: true,
            title: true,
            description: true
        }

        const allTopic = await prisma.topic.findMany({where,select})

        createCache(cacheKey,allTopic);
        return {
            operation:  true,
            data:       allTopic
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            status: 500,
            message: "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getTopicByIdNonJoin(id){
    const cacheKey = `get topic by id non join ${id}`;
    try{
        const cache = await getCache(cacheKey);
        if(cache !== null)
            return{
                operation:  true,
                status:     200,
                data:       cache
            }

        const where = { id };
        const topic = await prisma.topic.findUnique({where});

        createCache(cacheKey,topic);
        return {
            operation:  true,
            data:       topic
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            status: 500,
            message: "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getTopicById(id){
    const cacheKey = `get topic by id ${id}`;
    try{
        const cache = await getCache(cacheKey);
        if(cache !== null)
            return{
                operation:  true,
                status:     200,
                data:       cache
            }

        const where = { id };
        const include = {
            assignment: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                }
            },
            material: {
                select: {
                    id: true,
                    name: true,
                    type: true,
                    link: true,
                }
            }
        }
        const select = {
            id: true,
            title: true,
            description: true,
            assignment: include.assignment,
            material: include.material
        }

        const topic = await prisma.topic.findUnique({where,select})

        createCache(cacheKey,topic);
        return {
            operation:  true,
            data:       topic
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            status: 500,
            message: "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function getTopicsByCourseId(courseId){
    const cacheKey = `get topic by course id ${courseId}`;
    try{
        const cache = await getCache(cacheKey);
        if(cache !== null)
            return{
                operation:  true,
                status:     200,
                data:       cache
            }

        const where = { courseId }
        const topic = await prisma.topic.findMany({where})

        createCache(cacheKey,topic);
        return {
            operation:  true,
            data:       topic
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

async function updateTopicById(updatedTopic){
    try{
        const where = { id:updatedTopic.id }
        const data = {
            title:          updatedTopic.title,
            description:    updatedTopic.description,
            courseId:       updatedTopic.courseId
        }
        const updating = await prisma.topic.update({where,data})
        return {
            operation:  true,
            message:    `Successfully update Topic with id: ${updating.id}`
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            status: 500,
            message: "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

async function deleteTopicById(id){
    try{
        await prisma.topic.delete({where:{id}})
        return {
            operation:  true,
            message:    `Successfully delete Topic with id: ${id}`
        }
    }
    catch (err){
        console.log("====== Error Log ======");
        console.log(err);
        console.log("====== End of Error Log ======")

        return {
            operation: false,
            status: 500,
            message: "Internal Server Error",
        };
    }
    finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    createNewTopic,
    getAllTopicByCourseId,
    getTopicById,
    getTopicByIdNonJoin,
    getTopicsByCourseId,
    updateTopicById,
    deleteTopicById
}