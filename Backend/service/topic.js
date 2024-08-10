const topicModel = require("../model/topicModel");

async function getAllTopicByCourseId(courseId){
    return await topicModel.getAllTopicByCourseId(courseId);;
}

async function getAllTopicById(Id){
    return await topicModel.getTopicById(Id);;
}

async function createNewTopic(topic){
    return await topicModel.createNewTopic(topic);
}

async function updateTopicById(topic){
    return await topicModel.updateTopicById(topic);
}

async function deleteTopicById(topic){
    return await topicModel.deleteTopicById(topic);
}

module.exports = {
    getAllTopicByCourseId,
    getAllTopicById,
    createNewTopic,
    updateTopicById,
    deleteTopicById
};