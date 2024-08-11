const assigmentModel = require("../model/assignmentModel");

async function createNewAssignment(newAssignment){
    return await assigmentModel.createNewAssignment(newAssignment);
}

async function updateAssignment(updatedAssignment){
    return await assigmentModel.updateAssignmentById(updatedAssignment);
}

async function deleteAssignment(id){
    return await assigmentModel.deleteAssignmentById(id);
}

module.exports = { createNewAssignment,updateAssignment,deleteAssignment};