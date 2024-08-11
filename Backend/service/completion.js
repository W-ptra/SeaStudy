const completionModel = require("../model/completionModel");

async function createNewCompletion(newCompletion){
    return await completionModel.createNewCompletion(newCompletion);
}

module.exports = createNewCompletion;