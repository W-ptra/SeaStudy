const completionModel = require("../model/completionModel");
const {getTopicById} = require("../model/topicModel");

async function createNewCompletion(newCompletion){
    const topic = await getTopicById(newCompletion.topicId);
    if(topic.data === null)
        return {
            operation:      false,
            status:         400,
            message:        `topic with id ${topic.id} was not found`
        }

    return await completionModel.createNewCompletion(newCompletion);
}

module.exports = createNewCompletion;