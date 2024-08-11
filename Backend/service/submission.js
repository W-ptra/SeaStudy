const submissionModel = require("../model/submissionModel");

async function getAllSubmissionByAssignmentId(assignmentId){
    return await submissionModel.getAllSubmissionByAssignmentId(assignmentId);
}

async function getAllSubmissionByUserId(userId){
    return await submissionModel.getSubmissionByUserId(userId);
}

async function createNewSubmission(newSubmission){
    return await submissionModel.createNewSubmission(newSubmission);
}

async function updateSubmission(updatedSubmission){
    const isExist = await submissionModel.getSubmissionById(updatedSubmission.id);
    
    if(isExist.data === null)
        return {
            operation:  false,
            status:     404,
            message:    `Submission with id ${updatedSubmission.id} was not found`
        };

    return await submissionModel.updateSubmissionById(updatedSubmission);
}

module.exports = {
    getAllSubmissionByAssignmentId,
    getAllSubmissionByUserId,
    createNewSubmission,
    updateSubmission
}