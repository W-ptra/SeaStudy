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

async function test(){
    const payload = {
        title:  "Chapter 2",
        description:    "chapter 2 description",
        courseId: 2
    }
    const result = await createNewTopic(payload);
    console.log(result);
}
test();