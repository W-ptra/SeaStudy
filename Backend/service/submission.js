const submission = require("../model/submissionModel");

async function getAllSubmissionByAssignmentId(assignmentId){
    return await submission.getAllSubmissionByAssignmentId(assignmentId);
}

async function getAllSubmissionByUserId(userId){
    return await submission.getSubmissionByUserId(userId);
}

async function createNewSubmission(newSubmission){
    return await submission.createNewSubmission(newSubmission);
}

async function updateSubmission(updatedSubmission){
    return await submission.updateSubmissionById(updatedSubmission);
}

module.exports = {
    getAllSubmissionByAssignmentId,
    getAllSubmissionByUserId,
    createNewSubmission,
    updateSubmission
}