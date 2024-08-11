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
    const isExist = await topicModel.getTopicByIdNonJoin(topic.id);
    
    if(isExist.data === null)
        return {
            operation:  false,
            status:     404,
            message:    `Topic with id ${topic.id} was not found`
        };

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
    getAllTopicById,
    createNewTopic,
    updateTopicById,
    deleteTopicById
};