const {getEnrollmentsByUserId} = require("../model/enrollmentModel");
const {getCourseById} = require("../model/courseModel");
const topicModel = require("../model/topicModel");

async function getAllTopicByCourseId(userId,courseId){
    const course = await getCourseById(courseId);

    if(course.data == null)
        return {
            operation:  false,
            status:     404,
            message:    `Course with id ${courseId} was not found`
        }
    
    const isEnroll = await getEnrollmentsByUserId(userId,courseId);
    if(isEnroll.data == null)
        return {
            operation:  false,
            status:     403,
            message:    `User with id ${userId} is not enrolled on Course with id ${courseId}`
        }

    return await topicModel.getAllTopicByCourseId(courseId);;
}

async function getTopicById(userId,id){
    const topic = await topicModel.getTopicById(id);
    if(topic.data === null)
        return {
            operation:      false,
            status:         404,
            message:        `topic with id ${id} was not found`
        }

    const courseId = topic.data.courseId;

    const isEnroll = await getEnrollmentsByUserId(userId,courseId);
    if(isEnroll.data == null)
        return {
            operation:  false,
            status:     403,
            message:    `User with id ${userId} is not enrolled on Course with id ${courseId}`
        }

    return await topicModel.getTopicById(id);;
}

async function createNewTopic(userId,topic){

    const course = getCourseById(topic.courseId);

    if(course.data == null)
        return {
            operation:  false,
            status:     404,
            message:    `Course with id ${course.data.id} was not found`
        }

    if(course.data.userId !== userId)
        return {
            operation:  false,
            status:     401,
            message:    `Course with id ${course.data.id} doen't belong do instructor with userId ${userId}`
        }

    return await topicModel.createNewTopic(topic);
}

async function updateTopicById(topic){
    const isExist = await topicModel.getTopicByIdNonJoin(topic.id);
    
    if(isExist.data === null)
        return {
            operation:  false,
            status:     404,
            message:    `Topic with id ${topic.id} was not found`
        };

    const course = getCourseById(topic.courseId);

    if(course.data == null)
        return {
            operation:  false,
            status:     404,
            message:    `Course with id ${course.data.id} was not found`
        }

    return await topicModel.updateTopicById(topic);
}

async function deleteTopicById(id){
    const isExist = await topicModel.getTopicByIdNonJoin(id);
    
    if(isExist.data === null)
        return {
            operation:  false,
            status:     404,
            message:    `Topic with id ${id} was not found`
        };

    return await topicModel.deleteTopicById(id);
}

module.exports = {
    getAllTopicByCourseId,
    getTopicById,
    createNewTopic,
    updateTopicById,
    deleteTopicById
};