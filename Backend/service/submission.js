const { getEnrollmentsByUserId } = require("../model/enrollmentModel");
const { getAssignmentById } = require("../model/assignmentModel");
const { assignmentNotification } = require("../helper/email");
const { getCourseById } = require("../model/courseModel");
const { getTopicByIdNonJoin } = require("../model/topicModel");
const { getUserById } = require("../model/userModel");
const submissionModel = require("../model/submissionModel");

async function getAllSubmissionByAssignmentId(assignmentId){
    return await submissionModel.getAllSubmissionByAssignmentId(assignmentId);
}

async function getAllSubmissionByUserId(userId){
    return await submissionModel.getSubmissionByUserId(userId);
}

async function createNewSubmission(newSubmission){
    const assignment = await getAssignmentById(newSubmission.assignmentId);
    if(assignment.data === null)
        return {
            operation:      false,
            status:         404,
            message:        `Assignment with id ${newSubmission.assignmentId} was not found`
        }

    const topic = await getTopicByIdNonJoin(assignment.data.topicId);
    console.log(topic);
    const course = await getCourseById(topic.data.courseId);
    const isEnroll = await getEnrollmentsByUserId(newSubmission.userId,course.courseId);
    
    if(isEnroll.data === null)
        return {
            operation:      false,
            status:         403,
            message:        `User is not enrolled`
        }
    
    const instructor = await getUserById(course.data.userId);
    const student = await getUserById(newSubmission.userId);
    //assignmentNotification(instructor.data,student.data,assignment.data);
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