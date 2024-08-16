const assigmentModel = require("../model/assignmentModel");

async function createNewAssignment(newAssignment){
    return await assigmentModel.createNewAssignment(newAssignment);
}

async function updateAssignment(updatedAssignment){
    const isExist = await assigmentModel.getAssignmentById(updatedAssignment.id);
    
    if(isExist.data === null)
        return { 
            operation:false,
            status:404,
            message: `Assignment with id ${updatedAssignment.id} was not found` 
        };

    return await assigmentModel.updateAssignmentById(updatedAssignment);
}

async function deleteAssignment(id){
    const isExist = await assigmentModel.getAssignmentById(id);
    
    if(isExist.data === null)
        return {
            operation:false,
            status:404,
            message: `Assignment with id ${id} was not found`
        };

    return await assigmentModel.deleteAssignmentById(id);
}

module.exports = { createNewAssignment,updateAssignment,deleteAssignment};