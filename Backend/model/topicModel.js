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
            message:    `Sucessfully created new topic with id: ${topic.id}`
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

async function getAllTopicByCourseId(courseId){
    try{
        const where = { courseId }
        const allTopic = await prisma.topic.findMany({where})
        return {
            operation:  true,
            data:       allTopic
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

async function getTopicById(topicId){
    try{
        const where = { id:topicId }
        const topic = await prisma.topic.findUnique({where})
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
            courseId:         updatedTopic.courseId
        }
        const updating = await prisma.topic.update({where,data})
        return {
            operation:  true,
            message:    `Sucessfully updated topic with id: ${updating.id}`
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

async function deleteTopicById(id){
    try{
        await prisma.topic.delete({where:{id}})
        return {
            operation:  true,
            message:    `Sucessfully delete topic with id: ${updating.id}`
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

module.exports = {
    createNewTopic,
    getAllTopicByCourseId,
    getTopicById,
    updateTopicById,
    deleteTopicById
}