const topicModel = require("../model/topicModel");
const {getCourseById} = require("../model/courseModel");

async function getAllTopicByCourseId(courseId){
    const course = getCourseById(courseId);

    if(course.data == null)
        return {
            operation:  false,
            status:     404,
            message:    `Course with id ${courseId} was not found`
        }

    return await topicModel.getAllTopicByCourseId(courseId);;
}

async function getTopicById(Id){
    return await topicModel.getTopicById(Id);;
}

async function createNewTopic(topic){

    const course = getCourseById(topic.courseId);

    if(course.data == null)
        return {
            operation:  false,
            status:     404,
            message:    `Course with id ${course.data.id} was not found`
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